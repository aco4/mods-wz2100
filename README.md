Name          |Description                         |Modifies             |Download
:-------------|:-----------------------------------|:--------------------|:------:
NoReveal      | Unexplored terrain is hidden       | `setupgame.js`      | [⬇️](https://github.com/aco4/mods-wz2100/raw/main/files/NoReveal)
FullReveal    | Entire map is visible              | `init.js`           | [⬇️](https://github.com/aco4/mods-wz2100/raw/main/files/FullReveal)
AA_start      | AA is researched for you           | `techlevel.js`      | [⬇️](https://github.com/aco4/mods-wz2100/raw/main/files/AA_start)
MiniMap_on    | Always have minimap                | `init.js`           | [⬇️](https://github.com/aco4/mods-wz2100/raw/main/files/MiniMap_on)
VTOL_off      | VTOL factory disabled              | `structure.json`    | [⬇️](https://github.com/aco4/mods-wz2100/raw/main/files/VTOL_off)
BigHVC        | HVC is bigger, heavier, and slower | `weapons.json`      | [⬇️](https://github.com/aco4/mods-wz2100/raw/main/files/BigHVC)
noXP          | Units do not gain experience       | `init.js`           | [⬇️](https://github.com/aco4/mods-wz2100/raw/main/files/noXP)
noDrums       | Oil drums do not spawn             | `oildrum.js`        | [⬇️](https://github.com/aco4/mods-wz2100/raw/main/files/noDrums)
noAI          | Bot that does nothing              |                     | [⬇️](https://github.com/aco4/mods-wz2100/raw/main/files/noAI)
maxPower      | 1000000 starting power             | `base.js`           | [⬇️](https://github.com/aco4/mods-wz2100/raw/main/files/maxPower)
Rainbow       | Players get changing rainbow color | `init.js`           | [⬇️](https://github.com/aco4/mods-wz2100/raw/main/files/Rainbow)
CampaignColor | AI players get campaign color      | `init.js`           | [⬇️](https://github.com/aco4/mods-wz2100/raw/main/files/CampaignColor)
noTerrain     | Terrain does not slow units        | `terraintable.json` | [⬇️](https://github.com/aco4/mods-wz2100/raw/main/files/noTerrain)
U-Walls       | Walls are unbreakable              | `structure.json`    | [⬇️](https://github.com/aco4/mods-wz2100/raw/main/files/U-Walls)
U-City        | City buildings are unbreakable     | `features.json`     | [⬇️](https://github.com/aco4/mods-wz2100/raw/main/files/U-City)
2xBuildSpeed  | Trucks build twice as fast         | `construction.json` | [⬇️](https://github.com/aco4/mods-wz2100/raw/main/files/2xBuildSpeed)
3xBuildSpeed  | Trucks build three times as fast   | `construction.json` | [⬇️](https://github.com/aco4/mods-wz2100/raw/main/files/3xBuildSpeed)
4xBuildSpeed  | Trucks build four times as fast    | `construction.json` | [⬇️](https://github.com/aco4/mods-wz2100/raw/main/files/4xBuildSpeed)
200UnitsLimit | 200 maximum units                  | `droidlimits.js`    | [⬇️](https://github.com/aco4/mods-wz2100/raw/main/files/200UnitsLimit)
250UnitsLimit | 250 maximum units                  | `droidlimits.js`    | [⬇️](https://github.com/aco4/mods-wz2100/raw/main/files/250UnitsLimit)
300UnitsLimit | 300 maximum units                  | `droidlimits.js`    | [⬇️](https://github.com/aco4/mods-wz2100/raw/main/files/300UnitsLimit)

# Instructions
1. Download the mod
2. Put it in `Warzone 2100/mods/4.5.5/autoload`
3. Restart Warzone 2100

# Compatibility
Mods work together if they modify different files. For example:
- NoReveal and AA_start are compatible
- FullReveal and MiniMap_on are not compatible (both modify `init.js`)
