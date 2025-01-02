namespace("MTW_");

function MTW_eventStartLevel() {
    // small delay. Some functions don't work if called immediately
    queue("foo", 1000);
    queue("setup", 1000);
}

function setup() {
    for (let player = 0; player < maxPlayers; player++) {
        setDroidLimit(player, 400);
    }
}

function foo() {
    queue("foo", 1000);
    for (let player = 0; player < maxPlayers; player++) {
        setPower(32767, player);
    }
}
