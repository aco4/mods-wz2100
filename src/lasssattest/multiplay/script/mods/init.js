namespace("lassattest_");

function lassattest_eventStartLevel() {
    setTimer("strike", 1000);
}

function strike() {
    fireWeaponAtLoc("LasSat", 125, 125, scavengerPlayer);
}

