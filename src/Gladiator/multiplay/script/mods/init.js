// Scroll limits
let x1 = 40;
let y1 = 40;
let x2 = 210;
let y2 = 210;

const num_voters = count_voters(); // number of eligible voters
let votes = Array(num_voters).fill(false); // keep track of who voted

namespace("gladiator_");

function gladiator_eventGameInit() {
    receiveAllEvents(true);
}

// Called when the level is started
function gladiator_eventStartLevel() {
    receiveAllEvents(true);

    setMissionTime(4*60); // 4 minutes
    queue("countdown", 4*60*1000 - 10);

    setScrollLimits(x1, y1, x2, y2);

    // setNoGoArea(128*(125-5), 128*(125-5), 128*(125+5), 128*(125+5), 0);
    setNoGoArea(125-5, 125-5, 125+5, 125+5, 0);

    // Let players see the whole map
    for (let player = 0; player < maxPlayers; player++) {
        if (!isSpectator(player)) {
            addSpotter(125, 125, player, 10000, false, 0);
            setExperienceModifier(player, 0);
        }
    }

    // Move the camera to the base
    if (!isSpectator(selectedPlayer)) {
        let [x, y] = find_base();
        cameraSlide((x-2)*128, y*128);
    }

    queue("info", 10*1000); // run this function 10 seconds later
}

function gladiator_eventMissionTimeout() {
    receiveAllEvents(true);

    setMissionTime(-1); // Remove the mission timer

    for (let player = 0; player < maxPlayers; player++) {
        if (!isSpectator(player)) {
            enumStruct(player).forEach((s) => {
                if (s.stattype != HQ && s.stattype != COMMAND_CONTROL) {
                    removeObject(s);
                }
            });
        }
    }


    // break scavenger walls
    for (s of enumStruct(scavengerPlayer)) {
        removeObject(s, true);
    }

    fire_las_sat();

    shrink_map();

    give_xp();
}

function gladiator_eventChat(from, to, message) {
    receiveAllEvents(true);

    console(".");

    if (getMissionTime() == -1) { // voting not allowed after walls break
        return;
    }

    if (isSpectator(from)) { // ignore spectator chat
        return;
    }

    if (
        message == "more time" ||      // English
        message == "больше времени" || // Russian
        message == "mais tempo"        // Portuguese (Brazil)
    ) {
        // If the player has not voted yet
        if (votes[from] == false) {
            votes[from] = true;
            if (count_votes() > Math.floor(num_voters / 2)) {
                console(`More time added.`);
                setMissionTime(getMissionTime() + 2*60); // add 2 minutes
                reset_votes();
            } else {
                console(`Player ${from} voted for more time.`);
            }
        }
    }
}

function give_xp() {
    queue("give_xp", 5*1000); // run this function every 5 seconds

    for (obj of enumArea(125-5, 125-5, 125+5, 125+5)) {
        if (obj.type == DROID) {
            setDroidExperience(obj, obj.experience + 0.5);
        }
    }
}

function shrink_map() {
    setScrollLimits(x1++, y1++, x2--, y2--);

    kill();

    if (x2-x1 > 16 && y2-y1 > 16) { // minimum diameter
        queue("shrink_map", 5*1000); // run this function every 5 seconds
    }
}

function fire_las_sat() {
    queue("fire_las_sat", 250); // run this function every 0.25 seconds

    // Pick a random border (north, south, east, or west)
    switch (syncRandom(4)) {
        case 0: // north
            var x = x1+syncRandom(x2 - x1);
            var y = y1 + 2;
            break;
        case 1: // south
            var x = x1+syncRandom(x2 - x1);
            var y = y2 - 2;
            break;
        case 2: // east
            var x = x2 - 2;
            var y = y1+syncRandom(y2 - y1);
            break;
        case 3: // west
            var x = x1 + 2;
            var y = y1+syncRandom(y2 - y1);
            break;
    }

    fireWeaponAtLoc("LasSat", x, y, scavengerPlayer);
}

// Blow up droids outside the scroll limits
function kill() {
    for (let player = 0; player < maxPlayers; player++) {
        if (!isSpectator(player)) {
            enumDroid(player).forEach((d) => {
                if (out_of_bounds(d)) {
                    removeObject(d, true);
                }
            });
        }
    }
}

function info() {
    console(" ");
    console(" ");
    console("Walls break in 4 minutes");
    console(" ");
    console(" ");
    playSound("beep9.ogg");
}

function countdown() {
    playSound("10to1.ogg");
}

function out_of_bounds(obj) {
    return obj.x <= x1 || obj.y <= y1 || obj.x >= x2 || obj.y >= y2;
}

function get_player(playnum) {
    for (player of playerData) {
        if (player.position == playnum) {
            return player;
        }
    }
    return null;
}

// Locate the (x, y) position of the player's factory
function find_base() {
    if (isSpectator(selectedPlayer)) {
        return;
    }
    for (s of enumStruct(selectedPlayer, FACTORY)) {
        return [s.x, s.y];
    }
    return null;
}

// An eligible voter is human and non-spectator
function count_voters() {
    let count = 0;
    for (player of playerData) {
        if (player.isHuman && !isSpectator(player.position)) {
            count++;
        }
    }
    return count;
}

function reset_votes() {
    for (let i = 0; i < votes.length; i++) {
        votes[i] = false;
    }
}

function count_votes() {
    let count = 0;
    for (vote of votes) {
        if (vote) {
            count++;
        }
    }
    return count;
}

