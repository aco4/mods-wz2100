namespace("VTOLoff_");

function VTOLoff_eventStartLevel() {
    for (let player = 0; player < maxPlayers; player++) {
        setStructureLimits("A0VTolFactory1", 0, player);
    }
}
