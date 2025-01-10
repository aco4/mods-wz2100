namespace("fullreveal_");

function fullreveal_eventStartLevel() {
    hackNetOff();
    for (let player = 0; player < maxPlayers; player++) {
        addSpotter(0, 0, player, 45255, false, 0);
    }
    hackNetOn();
}
