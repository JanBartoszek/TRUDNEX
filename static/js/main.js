// This function is to initialize the application
function init() {
    // init data
    dataHandler.init();
    // loads the boards to the screen
    dom.createNewBoardButton();
    dom.loadBoards();
    dom.loadStatuses();

}

init();
