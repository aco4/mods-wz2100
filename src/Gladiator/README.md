# What does this mod change?

---

## Trucks OFF
`Gladiator/stats/research.json`

```diff
"R-Sys-Spade1Mk1": {
    ...
-   "resultComponents": [
-       "Spade1Mk1",
-       "CyborgSpade"
-   ],
+   "resultComponents": [],
    ...
},
```

---

## Units gain rank faster
`Gladiator/multiplay/script/mods/init.js`

```js
setExperienceModifier(player, 500);
```

---

## Walls can't break
`Gladiator/stats/structure.json`

```diff
"A0HardcreteMk1CWall": {
    ...
-   "hitpoints": 700,
+   "hitpoints": 65536,
    ...
},
```

---

## 6x factory speed
`Gladiator/stats/structure.json`

```diff
"A0LightFactory": {
    ...
-   "productionPoints": 10,
-   "moduleProductionPoints": 10,
+   "productionPoints": 60,
+   "moduleProductionPoints": 60,
    ...
},
```

---

## 6x cyborg factory speed
`Gladiator/stats/structure.json`

```diff
"A0CyborgFactory": {
    ...
-   "productionPoints": 10,
-   "moduleProductionPoints": 10,
+   "productionPoints": 60,
+   "moduleProductionPoints": 60,
    ...
},
```

---

## No oil drums
`Gladiator/multiplay/script/rules/oildrum.js`

```js
function placeOilDrum() {}

function eventPickup() {}

function oilDrumInit() {
    oilDrumData.maxOilDrums = 0;
}
```

---

## 500 units limit
`Gladiator/multiplay/script/rules/setup/droidlimits.js`

```js
function droidLimit(player)	// inside hackNetOff()
{
-   setDroidLimit(player, 150, DROID_ANY);
+   setDroidLimit(player, 500, DROID_ANY);
    setDroidLimit(player, 10, DROID_COMMAND);
    setDroidLimit(player, 15, DROID_CONSTRUCT);
}

```

---

## 99999 power
`Gladiator/multiplay/script/rules/setup/base.js`

```diff
-   setPower(2500, player);
+   setPower(99999, player);
    completeResearchOnTime(timeAdvancedBaseTech, player);
```

---

## 3x research speed
`Gladiator/stats/structure.json`

```diff
-   "researchPoints": 14,
-   "moduleResearchPoints": 7,
+   "researchPoints": 42,
+   "moduleResearchPoints": 21,
```
