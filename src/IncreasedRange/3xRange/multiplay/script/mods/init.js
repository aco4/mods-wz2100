namespace("IncreasedRange_");

function IncreasedRange_eventStartLevel() {
    for (let player = 0; player < maxPlayers; player++) {
        Object.keys(Upgrades[player].Weapon).forEach(key => {
            Upgrades[player].Weapon[key].MinRange *= 3;
            Upgrades[player].Weapon[key].MaxRange *= 3;
        });
        Object.keys(Upgrades[player].Sensor).forEach(key => {
            Upgrades[player].Sensor[key].Range *= 3;
        });
    }
}
