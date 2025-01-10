namespace("minimapon_");

function minimapon_eventStartLevel() {
    setTimer("loop", 500);
}

function loop() {
    setMiniMap(true);
}
