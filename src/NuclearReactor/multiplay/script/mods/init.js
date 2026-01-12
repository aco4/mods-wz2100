const GROUP_REACTORS = 0;

// 6x6 square around the reactor is checked for towers
const TOWER_RADIUS = 3;
const EXPLOSION_CHANCE = 20; // higher = less likely
const REACTOR_POWER_MODIFIER_PERCENT = 5;

var burners = [];
var suppress = new Set();

function eventStartLevel()
{
	setTimer("tickReactors", 1000);
	setTimer("tickBurners", 200);
}

function eventStructureBuilt(structure, droid)
{
	if (structure.name === "*NuclearReactor*")
	{
		hackNetOff();
		updatePowerModifier(structure.player)
		hackNetOn();
		groupAdd(GROUP_REACTORS, structure);
	}
}

// This event fires before eventDestroyed
function eventObjectRecycled(object)
{
	suppress.add(object.id); // do not explode demolished reactors
}

// This event fires after eventObjectRecycled
function eventDestroyed(object)
{
	if (object.name === "*NuclearReactor*" && object.status === BUILT)
	{
		hackNetOff();
		updatePowerModifier(object.player);
		hackNetOn();
		if (suppress.has(object.id))
		{
			suppress.delete(object.id);
		}
		else
		{
			fireWeaponAtLoc("Bomb5-VTOL-Plasmite", object.x - 1 + syncRandom(2), object.y - 1 + syncRandom(2), scavengerPlayer, true);
			burners.push([object.x, object.y]);
		}
	}
}

function eventSelectionChanged(objects)
{
	if (objects.some(object => object.name === "*NuclearReactor*" && object.player === selectedPlayer))
	{
		playSound("pcv654.ogg"); // nuclear reactor
		const reactors = countStruct("NuclearReactor", selectedPlayer);
		if (reactors === 1)
		{
			console(`${reactors} Nuclear Reactor: +${reactors * REACTOR_POWER_MODIFIER_PERCENT}% power`);
		}
		else
		{
			console(`${reactors} Nuclear Reactors: +${reactors * REACTOR_POWER_MODIFIER_PERCENT}% power`);
		}
	}
}

function tickReactors()
{
	hackNetOff();
	enumGroup(GROUP_REACTORS).forEach(reactor =>
	{
		let towers = 0;
		enumArea(reactor.x - 3, reactor.y - 3, reactor.x + 3, reactor.y + 3, ALL_PLAYERS, false).forEach(object =>
		{
			if (object.name === "*CoolingTower*" && object.status === BUILT)
			{
				towers++;
			}
		});

		if (syncRandom(towers * EXPLOSION_CHANCE) === 0)
		{
			fire(reactor.x, reactor.y);
		}
	});
	hackNetOn();
}

function tickBurners()
{
	const stillBurning = [];
	for (const [x, y] of burners)
	{
		fireWeaponAtLoc("NuclearReactorExplosion", x - 1 + syncRandom(2), y - 1 + syncRandom(2), scavengerPlayer, true);
		if (syncRandom(100) > 0)
		{
			stillBurning.push([x, y]);
		}
	}
	burners = stillBurning;
}

function updatePowerModifier(player)
{
	const reactors = countStruct("NuclearReactor", player);
	const powerModifier = getPowerModifier(player) + (reactors * REACTOR_POWER_MODIFIER_PERCENT);
	setPowerModifier(powerModifier, player);
}

function fire(x, y)
{
	// corners
	//addStructure("CollectiveWall", scavengerPlayer, (x-2)*128, (y-2)*128);
	//addStructure("CollectiveWall", scavengerPlayer, (x+1)*128, (y+1)*128);

	fireWeaponAtLoc("NuclearReactorFlame", x-1, y-1, scavengerPlayer, true);
	fireWeaponAtLoc("NuclearReactorFlame", x-1, y+0, scavengerPlayer, true);
	fireWeaponAtLoc("NuclearReactorFlame", x+0, y-1, scavengerPlayer, true);
	fireWeaponAtLoc("NuclearReactorFlame", x+0, y+0, scavengerPlayer, true);
	fireWeaponAtLoc("NuclearReactorFlame", x - 2 + syncRandom(4), y - 2 + syncRandom(4), scavengerPlayer, true);
}

function getPowerModifier(player)
{
	if (powerType === 0)
	{
		return 85;
	}
	else if (powerType === 2)
	{
		return 125;
	}

	// insane difficulty is meant to be insane...
	if (playerData[player].difficulty === INSANE)
	{
		return 200;
	}
	else if (playerData[player].difficulty === HARD)
	{
		return 150;
	}
	else if (playerData[player].difficulty === EASY)
	{
		return 70;
	}

	return 100;
}
