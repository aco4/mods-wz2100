namespace("StartWithTanks_");

function StartWithTanks_eventStartLevel() {
    for (let player = 0; player < maxPlayers; player++) {
        const trucks = enumDroid(player, DROID_CONSTRUCT);

        const occupiedTiles = new Set();
        for (const truck of trucks) {
            occupiedTiles.add(`${truck.x},${truck.y}`);
        }

        for (const truck of trucks) {
            const x = truck.x;
            const y = truck.y;
            const ttype = terrainType(x, y);

            let selectedPosition = null;
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    if (ttype === TER_WATER || ttype === TER_CLIFFFACE) {
                        continue;
                    }
                    if (occupiedTiles.has(`${x+dx},${y+dy}`)) {
                        continue;
                    }
                    if (getObject(x+dx, y+dy)) {
                        continue;
                    }

                    selectedPosition = {
                        x: truck.x + dx,
                        y: truck.y + dy
                    };
                    break;
                }
                if (selectedPosition !== null) {
                    break;
                }
            }

            if (selectedPosition === null) {
                selectedPosition = {
                    x: truck.x,
                    y: truck.y
                };
            }

            hackNetOff();
            addDroid(player, selectedPosition.x, selectedPosition.y, _("Machinegun Viper Wheels"), "Body1REC", "wheeled01", "", "", "MG1Mk1");
            hackNetOn();

            occupiedTiles.add(`${selectedPosition.x},${selectedPosition.y}`);
        }
    }
}
