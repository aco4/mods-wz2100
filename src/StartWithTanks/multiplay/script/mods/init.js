namespace("StartWithTanks_");

function StartWithTanks_eventStartLevel() {
    for (let player = 0; player < maxPlayers; player++) {
        const trucks = enumDroid(player, DROID_CONSTRUCT);
        for (let i = 0; i < trucks.length; i++) {
            if (i % 2 === 1) {
                const truck = trucks[i];
                hackNetOff();
                removeObject(truck, false);
                addDroid(player, truck.x, truck.y, _("Machinegun Viper Wheels"), "Body1REC", "wheeled01", "", "", "MG1Mk1");
                hackNetOn();
            }
        }
    }
}
