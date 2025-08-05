namespace("FactoryOutput_");

const FACTORY_OUTPUT = %%MODIFIER%%;

// Map the original droid to its duplicates
const droidMapping = {};

function FactoryOutput_eventDroidBuilt(droid, structure) {
    // If not built from a factory
    if (!structure) {
        return;
    }

    duplicateDroid(droid, FACTORY_OUTPUT - 1);
}

// droid : the droid to duplicate
// count : how many duplicates to create
function duplicateDroid(droid, count) {
    const turrets = getTurrets(droid);
    if (!turrets) {
        return;
    }

    droidMapping[droid.id] = [];

    hackNetOff();
    for (let i = 0; i < count; i++) {
        const newDroid = addDroid(droid.player, droid.x, droid.y, droid.name, droid.body, droid.propulsion, "", "", ...turrets);
        if (newDroid) {
            droidMapping[droid.id].push(newDroid);
        }
    }
    hackNetOn();

    queue("goToDeliveryPoint", 400, droid);
}

// Identify a droid's turret, if possible
// Returns an array on success, null otherwise
function getTurrets(droid) {
    // Return null for turrets we cannot reliably identify (e.g. Wide Spectrum Sensor)
    switch (droid.droidType) {
        case DROID_WEAPON:    return droid.weapons.map(w => w.id);
        case DROID_CYBORG:    return droid.weapons.map(w => w.id);
        case DROID_CONSTRUCT: return droid.propulsion === "CyborgLegs" ? ["CyborgSpade"] : ["Spade1Mk1"];
        case DROID_REPAIR:    return droid.propulsion === "CyborgLegs" ? ["CyborgRepair"] : null;
        default:              return null;
    }
}

// Order a droid's duplicates to go to the delivery point
// BUG: this doesn't work for bots. For some reason, the `droid` parameter is lost
function goToDeliveryPoint(droid) {
    if (!droid) {
        return;
    }

    const destination = getDroidPath(droid).at(-1);
    if (!destination) {
        return;
    }

    const newDroids = droidMapping[droid.id];
    if (!newDroids) {
        return;
    }

    for (const newDroid of newDroids) {
        orderDroidLoc(newDroid, DORDER_MOVE, destination.x, destination.y);
    }

    delete droidMapping[droid.id];
};
