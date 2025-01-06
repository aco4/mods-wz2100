namespace("conditions_");

let win_state = Array(maxPlayers).fill("contending");

function conditions_eventGameInit() {
    queue("checkEndConditions", 3*1000);
}

function checkEndConditions() {
    for (let player = 0; player < maxPlayers; player++) {
        if (isSpectator(player)) {
            win_state[player] = "spec";
        } else if (countFactory(player) == 0 && countDroid(DROID_ANY, player) == 0) {
            win_state[player] = "lost";
        }
    }
    if (count_contenders() <= 1) {
        end_the_game();
    } else {
        queue("checkEndConditions", 3*1000);
    }
}

function end_the_game() {
    for (let player = 0; player < maxPlayers; player++) {
        if (player == selectedPlayer) {
            gameOverMessage(win_state[player] == "contending");
        }
    }
}

function countFactory(player) {
    return enumStruct(player, FACTORY).length;
}

// Count how many players are currently fighting (contending) for the win
function count_contenders() {
    let count = 0;
    for (state of win_state) {
        if (state == "contending") {
            count++;
        }
    }
    return count;
}

/*

// registrate events conditions_eventGameInit, conditions_eventDroidBuilt, conditions_eventStructureBuil, conditions_eventResearched, conditions_eventAttacked
namespace("conditions_");

const STATE_contender = "contender";
const STATE_winner = "winner";
const STATE_loser = "loser";
const STATE_spectator = "spectator";
const STRUCTS = [FACTORY, CYBORG_FACTORY]; // structures in which you can continue to play

var teams; // array class instance Team
var playersTeam; // array class instancePlayer

class Player
{
	constructor(playNum)
	{
		this.playNum = playNum;
	}

	hasFactory()
	{
		for (let i = 0; i < STRUCTS.length; ++i)
		{
			const onMapStructss = enumStruct(this.playNum, STRUCTS[i]);
			for (let j = 0; j < onMapStructss.length; ++j)
			{
				if (onMapStructss[j].status === BUILT)
				{
					return true;
				}
			}
		}
		return false;
	}

	hasDroid()
	{
		if (countDroid(DROID_ANY, this.playNum) > 0)
		{
			return true;
		}
		return false;
	}

	hasOnlyConstructor()
	{
		if (countDroid(DROID_ANY, this.playNum) - countDroid(DROID_CONSTRUCT, this.playNum) === 0)
		{
			return true;
		}
		return false;
	}

	finalizeGame(state)
	{
		if (state === STATE_loser && this.playNum === selectedPlayer)
		{
			gameOverMessage(false);
		}
		if (state === STATE_winner && this.playNum === selectedPlayer)
		{
			gameOverMessage(true);
		}
	}
}

class Team
{
	constructor(playerPlayNums)
	{
		this.players = playerPlayNums.map((playNum) => (new Player(playNum))); // array class instance  Player
		this.onlyAIbots = playerPlayNums.some((playNum) => (
			playerData[playNum].isAI === true
		));
		playerPlayNums.forEach((playerNum) => {
			playersTeam[playerNum] = this;
		});
	}

	hasFactory()
	{
		return this.players.some(
			(player) => {return player.hasFactory();}
		);
	}

	hasDroid()
	{
		return this.players.some(
			(player) => {return player.hasDroid();}
		);
	}

	canPlay() // TODO skip check if no new events.
	{
		if (!this.hasFactory() && !this.hasDroid())
		{
			return false;
		}
		return true;
	}

	containsPlayer(playNum)
	{
		return this.players.some(
			(player) => {return player.playNum === playNum;}
		);
	}

	setState(state)
	{
		this.state = state;
		this.players.forEach(
			(player) =>
			{
				setGameStoryLogPlayerDataValue(player.playNum, "usertype", this.state);
			}
		);
		if (state ===  STATE_winner || state === STATE_loser ||  state === STATE_spectator)
		{
			this.players.forEach(
				(player) =>
				{
//					debug("Setting player " + player.playNum + " to state: " + this.state);
					player.finalizeGame(this.state);
				}
			);
		}
	}

	isContender()
	{
		return this.state === STATE_contender;
	}
}

function checkEndConditions()
{
	const newlyLosingTeams = teams.filter((team) => (
		team.isContender() && !team.canPlay()
	));
	newlyLosingTeams.forEach((team) => {
		team.setState(STATE_loser);
	});
	const contenderTeams = teams.filter((team) => (team.isContender()));
	if (contenderTeams.length <= 1 && newlyLosingTeams.length > 0) // game end
	{
		contenderTeams.forEach((team) => {
			team.setState(STATE_winner);
		});

		// game over message for selectedPlayer who is spectator
		// (can be spectator-only slots who have not yet received a message,
		// or previous losers who were converted to spectators who should now receive
		// a new message that the game has fully ended)
		if (isSpectator(-1))
		{
			gameOverMessage(false);
		}
	}
}

//	FIXME allianceExistsBetween() dont correct if leave player in ALLIANCES_UNSHARED, ALLIANCES_TEAMS mode
//	and  team is garbage in NO_ALLIANCES, ALLIANCES mode
function inOneTeam(playnum, splaynum)
{

	if (
		(alliancesType === ALLIANCES_UNSHARED || alliancesType === ALLIANCES_TEAMS) &&
	playerData[playnum].team === playerData[splaynum].team
	)
	{
		return true;
	}
	else if (alliancesType === NO_ALLIANCES && playnum === splaynum)
	{
		return true;
	}
	//Victory in alliance mode is also personal.
	//Alliances do not affect victory.
	//allianceExistsBetween() is not used.
	else if (alliancesType === ALLIANCES && playnum === splaynum)
	{
		return true;
	}
	return false;
}

function createTeams()
{
	teams = [];
	playersTeam = Array(maxPlayers);
	const inTeamPlayNums = Array(maxPlayers).fill(false);
	for (let playNum = 0; playNum < maxPlayers; ++playNum)
	{
		if (isSpectator(playNum))
		{
			continue; // skip slots that start as spectators
		}
		if (!playerData[playNum].isHuman && !playerData[playNum].isAI)
		{
			// not an allocated slot (is closed or no player / AI)
			continue;
		}
		if (inTeamPlayNums[playNum] === true)
		{
			continue;
		}
		inTeamPlayNums[playNum] = true;
		const members =[playNum];
		for (let splayNum = 0; splayNum < maxPlayers; ++splayNum)
		{
			if (isSpectator(splayNum))
			{
				continue; // skip slots that start as spectators
			}
			if (!playerData[splayNum].isHuman && !playerData[splayNum].isAI)
			{
				// not an allocated slot (is closed or no player / AI)
				continue;
			}
			if (inTeamPlayNums[splayNum] === false && inOneTeam(playNum, splayNum) === true)
			{
				members.push(splayNum);
				inTeamPlayNums[splayNum] = true;
			}
		}
		const team = new Team(members);
		if (team.canPlay())
		{
			teams.push(team);
			team.setState(STATE_contender);
		}
		else
		{
			team.setState(STATE_spectator);
		}
	}

}

/////////////////////////////////////
//First start and loading the save.//
/////////////////////////////////////

function conditions_eventGameInit()
{
	createTeams();

	setTimer("checkEndConditions", 3000);
}

function conditions_eventGameLoaded()
{
	createTeams();
}

*/
