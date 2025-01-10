namespace("noXP_");

function noXP_eventStartLevel() {
    for (let player = 0; player < maxPlayers; player++) {
        setExperienceModifier(player, 0);
    }
}
