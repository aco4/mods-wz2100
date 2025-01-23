namespace("rainbow_");

const color = Array.from({length: maxPlayers}, (_, i) => i);

function rainbow_eventStartLevel() {
    setTimer("loop", 100);
}

function loop() {
    for (let player = 0; player < maxPlayers; player++) {
        color[player]++;
        if (color[player] > 9) {
            color[player] = 0;
        }
        changePlayerColour(player, pick_colour(color[player]));
    }
}

// 0 = green
// 1 = orange
// 2 = gray
// 3 = black
// 4 = red
// 5 = blue
// 6 = pink
// 7 = cyan
// 8 = yellow
// 9 = purple
// 10 = white
// 11 = bright blue
// 12 = neon green
// 13 = infrared
// 14 = ultraviolet
// 15 = brown
function pick_colour(x) {
    switch (x) {
        case 0: return 4;  // red
        case 1: return 6;  // pink
        case 2: return 1;  // orange
        case 3: return 8;  // yellow
        case 4: return 10; // white
        case 5: return 7;  // cyan
        case 6: return 11; // bright blue
        case 7: return 5;  // blue
        case 8: return 9;  // purple
        case 9: return 13; // infrared
    }
}

