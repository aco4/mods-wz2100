namespace("uber_");

function uber_eventStartLevel() {
    for (let player = 0; player < maxPlayers; player++) {
        setDroidLimit(player, 400);
        completeResearch("R-Sys-Autorepair-General", player);
    }
    loop();
}

function loop() {
    queue("loop", 1000);
    for (let player = 0; player < maxPlayers; player++) {
        setPower(10000, player);
    }
}
