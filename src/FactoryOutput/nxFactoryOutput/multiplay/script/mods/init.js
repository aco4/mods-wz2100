namespace("FactoryOutput_");

const FACTORY_OUTPUT = %%MODIFIER%%;

function FactoryOutput_eventDroidBuilt(droid, structure) {
    // If not built from a factory
    if (!structure) {
        return;
    }

    // Although eventDroidBuilt may receive events from all players, only the
    // player who owns the droid should emit the syncRequest. Unless the owner
    // player is a bot, in which case the host should handle it.
    if (droid.player !== me && playerData[droid.player].isHuman) {
        return;
    }

    // Emit a sync request to every player (including self)
    syncRequest(null, null, null, droid);
}

function FactoryOutput_eventSyncRequest(from, req_id, x, y, obj_id, obj_id2) {
    duplicateDroid(obj_id, FACTORY_OUTPUT - 1);
}

// count : how many duplicates to create
function duplicateDroid(droid, count) {
    const turrets = getTurrets(droid);
    if (!turrets) {
        return;
    }

    for (let i = 0; i < count; i++) {
        addDroid(droid.player, droid.x, droid.y, droid.name, droid.body, droid.propulsion, "", "", ...turrets);
    }
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
