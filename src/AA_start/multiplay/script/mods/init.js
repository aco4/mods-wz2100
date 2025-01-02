namespace("aastart_");

function aastart_eventStartLevel() {
    for (let player = 0; player < maxPlayers; player++) {
        completeResearch("R-Wpn-AAGun03", player); // Hurricane AA Turret
        completeResearch("R-Defense-AASite-QuadMg1", player); // Hurricane AA Site
        completeResearch("R-Wpn-Sunburst", player); // Sunburst AA Rocket Array
        completeResearch("R-Defense-Sunburst", player); // Sunburst AA Site
        completeResearch("R-Wpn-AAGun01", player); // AA Cyclone Flak Cannon
        completeResearch("R-Defense-AASite-QuadBof", player); // AA Cyclone Flak Cannon Emplacement
        completeResearch("R-Defense-WallTower-DoubleAAgun", player); // AA Cyclone Flak Cannon Hardpoint
    }
}
