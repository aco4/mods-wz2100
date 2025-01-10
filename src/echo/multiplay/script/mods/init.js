namespace("echo_");

function echo_eventGameInit() {
    receiveAllEvents(true);
}

function echo_eventChat(from, to, message) {
    console(message);
}
