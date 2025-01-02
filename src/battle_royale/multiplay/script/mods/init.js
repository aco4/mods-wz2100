// scroll limits
const limits = getScrollLimits();
let x1 = limits.x;
let y1 = limits.y;
let x2 = limits.x2;
let y2 = limits.y2;

// the map should shrink faster and faster over time
let shrink_interval = 3*60; // 3 minutes

namespace("cleptomaze_");

function cleptomaze_eventStartLevel() {
    queue("give_vision", 500); // begin giving players a permanent minimap 0.5 seconds after game start
    queue("warning", 20*60*1000 - 5*1000); // send a warning 5 seconds before the map begins shrinking
    queue("shrink_map", 20*60*1000); // begin shrinking the map 20 minutes after game start
    queue("strike", 20*60*1000); // begin laser satellite strikes 20 minutes after game start
}

function shrink_map() {
    queue("shrink_map", shrink_interval*1000); // run this function periodically

    x1++;
    y1++;
    x2--;
    y2--;
    let width = x2 - x1;
    let length = y2 - y1;
    // Approach a square
    if (width > length + 1) {
        x1++;
        x2--;
    }
    if (length > width + 1) {
        y1++;
        y2--;
    }

    if (x1 < x2 && y1 < y2) { // dont cause a crash
        setScrollLimits(x1, y1, x2, y2);
        laugh();
    }

    kill();

    shrink_interval -= 11; // Decrease interval by 11 seconds
    if (shrink_interval < 30) { // minimum 30 seconds
        shrink_interval = 30;
    }
}

function laugh() {
    switch (syncRandom(3)) {
        case 0:
            playSound("laugh1.ogg");
            break;
        case 1:
            playSound("laugh2.ogg");
            break;
        case 2:
            playSound("laugh3.ogg");
            break;
    }
}

function warning() {
    console(" ");
    console(" ");
    console("WARNING!")
    console("NEXUS IS DESTROYING THE MAP");
    console(" ");
    console(" ");
    playSound("beep9.ogg");
    playSound("pcv469.ogg");
}

function give_vision() {
    // Hack. Always let players have a minimap
    queue("give_vision", 1000); // run this function every second
    setMiniMap(true);
}

function strike() {
    queue("strike", 100); // run this function every 0.1 seconds

    switch (syncRandom(4)) {
        case 0: // Strike on the top border
            fireWeaponAtLoc("LasSat", x1+syncRandom(x2 - x1), y1, 10);
            break;
        case 1: // Strike on the bottom border
            fireWeaponAtLoc("LasSat", x1+syncRandom(x2 - x1), y2, 10);
            break;
        case 2: // Strike on the left border
            fireWeaponAtLoc("LasSat", x1, y1+syncRandom(y2 - y1), 10);
            break;
        case 3: // Strike on the right border
            fireWeaponAtLoc("LasSat", x2, y1+syncRandom(y2 - y1), 10);
            break;
    }
}

// Blow up structures and droids outside the scroll limits
function kill() {
    for (let player = 0; player < maxPlayers; player++) {
        enumStruct(player).forEach((s) => {
            if (out_of_bounds(s) && in_removal_zone(s)) {
                removeObject(s, true);
            }
        });

        enumDroid(player).forEach((d) => {
            if (out_of_bounds(d) && in_removal_zone(d)) {
                removeObject(d, true);
            }
        });
    }
}

function out_of_bounds(obj) {
    return obj.x < x1 || obj.y < y1 || obj.x > x2 || obj.y > y2;
}

function in_removal_zone(obj) {
    return obj.x >= x1 - 25 && obj.y >= y1 - 25 && obj.x <= x2 + 25 && obj.y <= y2 + 25;
}
