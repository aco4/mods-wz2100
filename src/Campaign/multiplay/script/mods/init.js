namespace("campaign_");

function campaign_eventStartLevel() {

    let team_human = [];

    for (player of playerData) {
        if (!team_human[player.team]) {
            team_human[player.team] = player.isHuman;
        }
    }

    switch (tilesetType) {
        case "ARIZONA":
            var enemy_color = 1; // orange
            break;
        case "URBAN":
            var enemy_color = 2; // gray
            break;
        case "ROCKIES":
            var enemy_color = 3; // black
            break;
    }

    for (player of playerData) {
        if (player.isAI && !team_human[player.team]) {
            changePlayerColour(player.position, enemy_color);
            setAlliance(player.position, scavengerPlayer, true);
        }
    }

    changePlayerColour(scavengerPlayer, 7); // cyan
}
