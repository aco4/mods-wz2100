/**
 * By wanjia1
 * 06 Aug 2025, 17:17
 * https://forums.wz2100.net/viewtopic.php?p=150378#p150378
 */

//Controls weather conditions like rain/snow. Fog stuff goes here.

// legacy function
function weatherCycle() {}


// seconds
const PERIOD_DAY=1200
const PERIOD_WEATHER=300
const VARY_POWER=false
const VARY_STAT=false











// 12:00
var t=0.5

var skyLight_time=[0, .2, .3, .35, .5, .65, .7, .8, 1]
var skyLight_color=[[.1,.2,.3],[.1,.2,.3],[.9,.6,.3],[.9,.8,.7],[.9,.9,.9],[.9,.8,.7],[.9,.6,.3],[.1,.2,.3],[.1,.2,.3]]
var skyLight_weather=[
	[.5,.6,.7],//[90,90,120]
	[.8,.9,1.],
	[1.,1.,1.]
]
var skyLight_prev=[1.,1.,1.]

var fogColour_weather=[
	[30,50,70],//[90,90,120]
	[200,200,200],
	[182,225,236]
]
var fogColour_prev=[182,225,236]

function skyLight(time=0) {
	var t=time*Math.PI*2

	if (.25<time && time<.75) {
		//Sun
		setSunPosition(-Math.sin(t)*650,Math.cos(t)*650,450)
		var r=.9
		var g=.6
		var b=.3
	} else {
		//Moon
		setSunPosition(Math.sin(t)*650,-Math.cos(t)*650,450)
		var r=.1
		var g=.2
		var b=.3
	}

	var fadeSpeed=.02

	var [r3,g3,b3]=skyLight_prev
	var [r2,g2,b2]=skyLight_weather[weather_prev]
	skyLight_prev=[r3*(1-fadeSpeed)+r2*fadeSpeed, g3*(1-fadeSpeed)+g2*fadeSpeed, b3*(1-fadeSpeed)+b2*fadeSpeed]

	for (var i=0;i<skyLight_time.length;i++) {
		if (time<skyLight_time[i]) {
			var s=(time-skyLight_time[i-1])/(skyLight_time[i]-skyLight_time[i-1])
			var [r1,g1,b1]=skyLight_color[i-1]
			var [r2,g2,b2]=skyLight_color[i]
			var [r3,g3,b3]=skyLight_prev

			var [r,g,b]=[r1*(1-s)+r2*s,g1*(1-s)+g2*s,b1*(1-s)+b2*s]
			var [r,g,b]=[r*r3, g*g3, b*b3]
			// avoid structures get too bright
			var intensity=0.299*r+0.587*g+0.114*b
			var scale=intensity<.6 ? 1 : .6/intensity
			setSunIntensity(r*scale,g*scale,b*scale, r,g,b, r,g,b)
			break
		}
	}

	var [r1,g1,b1]=fogColour_weather[weather_prev]
	var [r2,g2,b2]=[r1*r*1.1,g1*g*1.1,b1*b*1.1]
	var [r3,g3,b3]=fogColour_prev
	fogColour_prev=[r3*(1-fadeSpeed)+r2*fadeSpeed, g3*(1-fadeSpeed)+g2*fadeSpeed, b3*(1-fadeSpeed)+b2*fadeSpeed]
	var [r3,g3,b3]=fogColour_prev
	setFogColour(Math.floor(r3),Math.floor(g3),Math.floor(b3))
}

function processTime() {
	t=(t+1/PERIOD_DAY)%1
	skyLight(t)
	if (VARY_POWER) varyPower(t)
}
setTimer(processTime.name,1000)












//rain snow clear
var weather_transition=[
	[.2,.5,.3],
	[.4,.2,.4],
	[.3,.3,.4]
]
var weather_prev=WEATHER_CLEAR

function processWeather() {
	var arr=weather_transition[weather_prev]
	var v=syncRandom(1000)/1000
	for (var i=0;i<3;i++) {
		if (v<arr[i]) {
			if (VARY_STAT) varyStat(weather_prev,i)
			weather_prev=i
			setWeather(i)
			return
		}
		v-=arr[i]
	}
}
setTimer(processWeather.name,PERIOD_WEATHER*1000)













function varyPower_rateModifier(player) {
	var diff=playerData[player].difficulty
	if (diff == INSANE) return 200 + 15 * powerType
	if (diff == HARD) return 150 + 10 * powerType
	if (diff == EASY) return 70 + 5 * powerType
	if (powerType == 0) return 85
	if (powerType == 2) return 125
	return 100
}
function varyPower(t) {
	var a=-Math.cos(t*Math.PI*2)
	var intensity=a>0?a:a*-.5
	for (var i=0;i<maxPlayers;i++) {
		var base=varyPower_rateModifier(i)
		setPowerModifier(base*intensity,i)
	}
}


var varyStat_sensor=	[-.15,-.3,0]
var varyStat_engine=	[0,-.3,0]
var varyStat_truck=		[1,0,0]
var varyStat_factory=	[0,1,0]
function varyStat(weather_prev, weather_curr) {
	if (weather_prev==weather_curr)
		return

	function update(statTable, item, attr) {
		var diff=statTable[weather_curr]-statTable[weather_prev]
		for (var player=0;player<maxPlayers;player++) {
			for (var comp in Upgrades[player][item]){
				Upgrades[player][item][comp][attr]+=Math.trunc(diff*Stats[item][comp][attr])
			}
		}
	}
	update(varyStat_sensor,"Sensor","Range")
	update(varyStat_engine,"Body","Power")
	update(varyStat_truck,"Construct","ConstructorPoints")
	update(varyStat_factory,"Building","ProductionPoints")
}








/** An event that is run once the game has started and all game data has been loaded. 
*/
function eventStartLevel() {
	//setSky("texpages/page-25-sky-urban.png", 0.5, 10000.0);
	processTime()
	processWeather()
}
