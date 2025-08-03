namespace("FactorySpeed_");

const NUM_DUPLICATES = 1;

function FactorySpeed_eventDroidBuilt(droid, structure) {
    // If not built from a factory
    if (!structure) {
        return;
    }

    syncRequest(null, null, null, droid);
}

function FactorySpeed_eventSyncRequest(from, req_id, x, y, obj_id, obj_id2) {
    const turrets = (() => {
        switch (obj_id.droidType) {
            case DROID_WEAPON:    return obj_id.weapons.map(w => w.name);
            case DROID_CYBORG:    return obj_id.weapons.map(w => w.name);
            case DROID_CONSTRUCT: return obj_id.propulsion === "CyborgLegs" ? ["CyborgSpade"] : ["Spade1Mk1"];
            case DROID_REPAIR:    return obj_id.propulsion === "CyborgLegs" ? ["CyborgRepair"] : null;
            default:              return null;
        }
    })();

    if (!turrets) {
        return;
    }

    for (let i = 0; i < NUM_DUPLICATES; i++) {
        addDroid(obj_id.player, obj_id.x, obj_id.y, obj_id.name, obj_id.body, obj_id.propulsion, "", "", ...turrets);
    }
}
