namespace("minimapon_");

function minimapon_eventStartLevel() {
    loop();
}

function loop() {
    queue("loop", 500);
    setMiniMap(true);
}
