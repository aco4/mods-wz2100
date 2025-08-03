namespace("unitLimitOption_");

function unitLimitOption_eventStartLevel() {
    if (scavengers === 1) {
        for (let p = 0; p < maxPlayers; p++) {
            setDroidLimit(p, 200);
        }
    } else if (scavengers === 0) {
        for (let p = 0; p < maxPlayers; p++) {
            setDroidLimit(p, 250);
        }
    }
}
