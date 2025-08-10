namespace("Dropship_");

const SPAWN_INTERVAL_SECONDS = 60;
const SPAWN_COUNT = 1;
const DROPSHIP_UPDATE_INTERVAL_SECONDS = 2;

const BORDER = Object.freeze({
    NORTH: 0,
    SOUTH: 1,
    EAST: 2,
    WEST: 3,
});

const DROP_SHAPE = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
];

const DROP_COUNT = DROP_SHAPE.flat().reduce((a, b) => a + b, 0);

class Dropship {
    objectives; // Array of Objective objects
    curr = 0; // Current objective (represented as an index in objectives)
    droidID;
    onDeath;
    onMissionComplete;

    constructor(player, x, y, objectives, onDeath, onMissionComplete) {
        this.objectives = objectives;
        this.onDeath = onDeath;
        this.onMissionComplete = onMissionComplete;

        hackNetOff();
        const droid = addDroid(player, x, y, "Dropship", "SuperTransportBody", "V-Tol", "", "", ["MG1-VTOL"]);
        hackNetOn();

        this.droidID = droid?.id;
    }

    // Main update routine
    update() {
        if (this.dead) {
            this.onDeath(this);
            return;
        }

        if (this.currentObjective.isComplete(this)) {
            this.completeObjective();
        } else {
            this.move();
        }
    }

    completeObjective() {
        this.currentObjective.onComplete(this);
        this.curr++;

        if (this.isMissionComplete) {
            this.onMissionComplete(this);
        } else {
            this.move();
        }
    }

    move() {
        const { x, y } = this.currentObjective.getLocation(this);
        hackNetOff();
        orderDroidLoc(this.droid, DORDER_MOVE, x, y);
        hackNetOn();
    }

    kill() {
        hackNetOff();
        removeObject(this.droid, true); // sfx
        hackNetOn();
    }

    despawn() {
        hackNetOff();
        removeObject(this.droid, false); // no sfx
        hackNetOn();
    }

    get isMissionComplete() {
        return this.curr >= this.objectives.length;
    }
    get currentObjective() {
        return this.objectives[this.curr];
    }
    get alive() {
        return this.droid != null;
    }
    get dead() {
        return this.droid == null;
    }
    get droid() {
        return getDroidByID(this.droidID);
    }
    get player() {
        return getDroidByID(this.droidID)?.player;
    }
}


////////////////////////////////////////////////////////////////////////////////


const dropships = new Set();

// For each player, calculate the 2 borders that they are closest to
const adjacentBorders = Array.from({ length: maxPlayers }, (_, player) => {
    const { x: x1, y: y1, x2, y2 } = getScrollLimits();
    const x = startPositions[player].x;
    const y = startPositions[player].y;
    const borders = [
        { border: BORDER.NORTH, dist: y - y1 },
        { border: BORDER.SOUTH, dist: y2 - y },
        { border: BORDER.EAST,  dist: x2 - x },
        { border: BORDER.WEST,  dist: x - x1 },
    ];
    return borders.sort((a, b) => a.dist - b.dist);
});

function Dropship_eventStartLevel() {
    playSound("pcv440.ogg"); // "Reinforcements are available"
    setTimer("spawnDropships", SPAWN_INTERVAL_SECONDS * 1000);
    setTimer("updateDropships", DROPSHIP_UPDATE_INTERVAL_SECONDS * 1000);
}

function spawnDropships() {
    // Clean up old dropships
    dropships.forEach(d => d.kill());
    dropships.clear();

    // Spawn new dropships
    for (let player = 0; player < maxPlayers; player++) {
        if (hasCombatDroid(player)) {
            for (let i = 0; i < SPAWN_COUNT; i++) {
                spawnDropship(player);
            }
            if (player === me) {
                playSound("pcv441.ogg"); // "Reinforcements in transit"
            }
        }
    }
}

function updateDropships() {
    dropships.forEach(d => d.update());
}

function spawnDropship(player) {
    let dropLocation;
    const dropTrucks = hasConstructionDroid(player) === false;
    if (dropTrucks) {
        const home = startPositions[player];
        dropLocation = pickStructLocation(enumDroid(player)[0], "A0HardcreteMk1Wall", home.x, home.y) || { x: home.x, y: home.y };
    } else {
        const droid = pickCombatDroid(player);
        dropLocation = pickStructLocation(droid, "A0HardcreteMk1Wall", droid.x, droid.y) || { x: droid.x, y: droid.y };
    }

    // Pick droids at spawnTime
    const droidsBEFORE = dropTrucks ? null : pickCombatDroids(player, DROP_COUNT);

    function pickLocationOnBorder(border) {
        const { x: x1, y: y1, x2, y2 } = getScrollLimits();
        const MARGIN = 1;
        switch (border) {
            case BORDER.NORTH: return { x: fuzz(dropLocation.x, x1+1, x2-1), y: y1+MARGIN };
            case BORDER.SOUTH: return { x: fuzz(dropLocation.x, x1+1, x2-1), y: y2-MARGIN };
            case BORDER.WEST:  return { x: x1+MARGIN, y: fuzz(dropLocation.y, y1+1, y2-1) };
            case BORDER.EAST:  return { x: x2-MARGIN, y: fuzz(dropLocation.y, y1+1, y2-1) };
        }
    }

    const spawnLocation = pickLocationOnBorder(adjacentBorders[player][syncRandom(2)].border);
    const departLocation = pickLocationOnBorder(adjacentBorders[player][syncRandom(2)].border);

    const objectives = [
        {
            getLocation: (dropship) => dropLocation,
            isComplete: (dropship) => isDroidAt(dropship.droid, dropLocation.x, dropLocation.y),
            onComplete: (dropship) => {
                if (dropship.player === me) {
                    playSound("pcv442.ogg"); // "Reinforcements landing"
                }

                let droidsAFTER = droidsBEFORE;

                // Re-pick droids at dropTime, if possible
                if (!dropTrucks && hasCombatDroid(player)) {
                    droidsAFTER = pickCombatDroids(player, DROP_COUNT);
                }

                hackNetOff();
                let i = 0;
                for (let row = 0; row < DROP_SHAPE.length; row++) {
                    for (let col = 0; col < DROP_SHAPE[row].length; col++) {
                        for (let count = 0; count < DROP_SHAPE[row][col]; count++) {
                            const x = dropLocation.x - 1 + col;
                            const y = dropLocation.y - 1 + row;
                            if (droidsAFTER) {
                                const droid = droidsAFTER[i++];
                                addDroid(dropship.player, x, y, droid.name, droid.body, droid.propulsion, "", "", droid.weapons.map(w => w.id));
                            } else {
                                addDroid(dropship.player, x, y, "Truck Viper Wheels", "Body1REC", "wheeled01", "", "", ["Spade1Mk1"]);
                            }
                        }
                    }
                }
                hackNetOn();

                if (dropTrucks && dropship.player === me) {
                    setReticuleButton(3, _("Build (F3)"), "image_build_up.png", "image_build_down.png");
                }
            },
        },
        {
            getLocation: (dropship) => departLocation,
            isComplete: (dropship) => isDroidNearBorder(dropship.droid),
            onComplete: (dropship) => dropship.despawn(),
        },
    ];

    const onDeath = (dropship) => dropships.delete(dropship);

    const dropship = new Dropship(player, spawnLocation.x, spawnLocation.y, objectives, onDeath, () => {});
    dropships.add(dropship);
}


////////////////////////////////////////////////////////////////////////////////


// fuzz(8, 0, 8) returns a number in the interval [4, 8]
// fuzz(7, 0, 8) returns a number in the interval [4, 8]
// fuzz(6, 0, 8) returns a number in the interval [4, 8]
// fuzz(5, 0, 8) returns a number in the interval [3, 7]
// fuzz(4, 0, 8) returns a number in the interval [2, 6]
// fuzz(3, 0, 8) returns a number in the interval [1, 5]
// fuzz(2, 0, 8) returns a number in the interval [0, 4]
// fuzz(1, 0, 8) returns a number in the interval [0, 4]
// fuzz(0, 0, 8) returns a number in the interval [0, 4]
// WARNING only works for ranges >= 8
function fuzz(n, min, max) {
    const range = max - min;
    const radius = Math.floor(range / 8); // <--- configurable

    let start = n - radius;
    let end = n + radius;

    // Clamp window to [min, max]
    if (start < min) {
        end += min - start;
        start = min;
    }
    if (end > max) {
        start -= end - max;
        end = max;
    }

    return start + syncRandom(end - start + 1);
}

function pickCombatDroids(player, count) {
    const combatDroids = getCombatDroids(player);
    return Array.from({ length: count }, () => pick(combatDroids));
}

function pickCombatDroid(player) {
    return pick(getCombatDroids(player));
}

// Pick a random element from an array
function pick(arr) {
    if (!arr || arr.length === 0) {
        return null;
    }
    return arr[syncRandom(arr.length)];
}

function getCombatDroids(player) {
    return [...enumDroid(player, DROID_WEAPON), ...enumDroid(player, DROID_CYBORG)];
}

function getConstructionDroids(player) {
    return enumDroid(player, DROID_CONSTRUCT);
}

function hasCombatDroid(player) {
    return getCombatDroids(player).length > 0;
}

function hasConstructionDroid(player) {
    return getConstructionDroids(player).length > 0;
}

// Check if the given droid is at x, y
function isDroidAt(droid, x, y, margin = 1) {
    const objects = enumArea(
        x - margin,
        y - margin,
        x + margin,
        y + margin,
        ALL_PLAYERS,
        false
    );
    return objects.some(o => o.id === droid.id);
}

function isDroidNearBorder(droid, margin = 1) {
    const { x, y, x2, y2 } = getScrollLimits();
    return droid.x <= x + margin
        || droid.y <= y + margin
        || droid.x >= x2 - margin
        || droid.y >= y2 - margin;
}

// Get an updated reference to the droid with the given id
function getDroidByID(id) {
    for (let player = 0; player < maxPlayers; player++) {
        const droid = getObject(DROID, player, id);
        if (droid) {
            return droid;
        }
    }
    return null;
}
