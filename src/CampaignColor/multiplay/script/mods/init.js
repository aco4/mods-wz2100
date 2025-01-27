namespace("campaigncolor_");

function campaigncolor_eventStartLevel() {
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

    for (obj of playerData) {
        if (obj.isAI) {
            changePlayerColour(obj.position, enemy_color);
        }
    }
}
