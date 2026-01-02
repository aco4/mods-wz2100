function setupStructureLimit(player)	// inside hackNetOff()
{
	setStructureLimits("A0LightFactory", %%MODIFIER%%, player);
	setStructureLimits("A0PowerGenerator", 10, player);
	setStructureLimits("A0ResearchFacility", 5, player);
	setStructureLimits("A0CommandCentre", 1, player);
	setStructureLimits("A0ComDroidControl", 1, player);
	setStructureLimits("A0CyborgFactory", %%MODIFIER%%, player);
	setStructureLimits("A0VTolFactory1", %%MODIFIER%%, player);
}
