namespace("OilVision_");

function OilVision_eventStartLevel() {
    for (const { x, y } of derrickPositions) {
        for (let player = 0; player < maxPlayers; player++) {
            addSpotter(x, y, player, 91, false, 0);
        }
    }
}
