namespace("teamcolor_");

function teamcolor_eventStartLevel() {

    if (alliancesType == NO_ALLIANCES) {
        return;
    }

    let team_color = [];

    for (obj of playerData) {
        if (team_color[obj.team] === undefined) {
            team_color[obj.team] = obj.colour;
        } else if (obj.isHuman) {
            team_color[obj.team] = obj.colour;
        }
    }

    for (obj of playerData) {
        changePlayerColour(obj.position, team_color[obj.team]);
    }
}
