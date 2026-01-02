namespace("FactorySpeed_");

function FactorySpeed_eventStartLevel() {
    for (let player = 0; player < maxPlayers; player++) {
        Upgrades[player].Building["Factory"       ].ProductionPoints       *= %%MODIFIER%%;
        Upgrades[player].Building["Factory"       ].ModuleProductionPoints *= %%MODIFIER%%;
        Upgrades[player].Building["Cyborg Factory"].ProductionPoints       *= %%MODIFIER%%;
        Upgrades[player].Building["Cyborg Factory"].ModuleProductionPoints *= %%MODIFIER%%;
        Upgrades[player].Building["VTOL Factory"  ].ProductionPoints       *= %%MODIFIER%%;
        Upgrades[player].Building["VTOL Factory"  ].ModuleProductionPoints *= %%MODIFIER%%;
    }
}
