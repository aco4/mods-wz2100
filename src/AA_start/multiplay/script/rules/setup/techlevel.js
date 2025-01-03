function setupTechLevel(player)
{

	//global function, doc/js-functions
	var techLevel = getMultiTechLevel();
	if (techLevel === 2)
	{
		completeResearchOnTime(timeT2, player);
	}
	else if (techLevel === 3)
	{
		completeResearchOnTime(timeT3, player);
	}
	else if (techLevel === 4)
	{
		completeAllResearch(player);
	}

	completeResearch("R-Wpn-AAGun03", player); // Hurricane AA Turret
	completeResearch("R-Defense-AASite-QuadMg1", player); // Hurricane AA Site
	completeResearch("R-Wpn-Sunburst", player); // Sunburst AA Rocket Array
	completeResearch("R-Defense-Sunburst", player); // Sunburst AA Site
	completeResearch("R-Wpn-AAGun01", player); // AA Cyclone Flak Cannon
	completeResearch("R-Defense-AASite-QuadBof", player); // AA Cyclone Flak Cannon Emplacement
	completeResearch("R-Defense-WallTower-DoubleAAgun", player); // AA Cyclone Flak Cannon Hardpoint
}
