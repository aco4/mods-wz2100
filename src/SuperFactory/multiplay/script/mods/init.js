namespace("SuperFactory_");

const REQ_ID = 53414;
const NUM_DUPLICATES = 4;

function SuperFactory_eventDroidBuilt(droid, structure) {
    // If not built from a factory
    if (!structure) {
        return;
    }

    syncRequest(REQ_ID, null, null, droid);
}

function SuperFactory_eventSyncRequest(from, req_id, x, y, obj_id, obj_id2) {
    if (req_id !== REQ_ID) {
        return;
    }

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

    const count = (() => {
        const droidType = obj_id.droidType === DROID_CONSTRUCT ? DROID_CONSTRUCT : undefined;
        return Math.min(NUM_DUPLICATES, getDroidLimit(selectedPlayer, droidType) - countDroid(droidType ?? DROID_ANY, selectedPlayer));
    })();

    for (let i = 0; i < count; i++) {
        addDroid(obj_id.player, obj_id.x, obj_id.y, obj_id.name, obj_id.body, obj_id.propulsion, "", "", ...turrets);
    }
}
