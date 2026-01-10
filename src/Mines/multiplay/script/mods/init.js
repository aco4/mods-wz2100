const GROUP_MINES = 0;
const MINE_STRENGTH = 8;
var mines = [];

function eventStartLevel()
{
	setTimer("tickMines", 1000);
}

function eventStructureBuilt(structure, droid)
{
	if (structure.name === "Explosive Mine")
	{
		hackNetOff();
		removeObject(structure);
		hackNetOn();
		mines.push({ x: structure.x, y: structure.y, player: structure.player });
	}
}

function tickMines()
{
	hackNetOff();
	const liveMines = [];
	for (const mine of mines)
	{
		if (enemyNearby(mine.x, mine.y, mine.player))
		{
			for (let i = 0; i < MINE_STRENGTH; i++)
			{
				// Bombard
				fireWeaponAtLoc("Mortar2Mk1", mine.x, mine.y, mine.player, true);
			}
		}
		else
		{
			liveMines.push(mine);
		}
	}
	mines = liveMines;
	hackNetOn();
}

function enemyNearby(x, y, player)
{
	return enumRange(x, y, 1, ALL_PLAYERS, false).some(object =>
		object.type !== FEATURE && !allianceExistsBetween(player, object.player)
	);
}
