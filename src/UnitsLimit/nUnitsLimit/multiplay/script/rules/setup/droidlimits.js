function droidLimit(player)	// inside hackNetOff()
{
	setDroidLimit(player, %%MODIFIER%%, DROID_ANY);
	setDroidLimit(player, 10, DROID_COMMAND);
	setDroidLimit(player, 15, DROID_CONSTRUCT);
}
