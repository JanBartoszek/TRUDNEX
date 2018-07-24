// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
let dataHandler = {
    keyInLocalStorage: 'proman-data', // the string that you use as a key in localStorage to save your application data
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _loadData: function() {
        this._data =  JSON.parse(localStorage.getItem(this.keyInLocalStorage));
        
        // it is not called from outside
        // loads data from local storage, parses it and put into this._data property
        // -3-

    },
    _saveData: function(_data) {
        localStorage.setItem("proman-data", JSON.stringify(_data));
        // it is not called from outside
        // saves the data from this._data to local storage
        // -3- Yaro
    },
    init: function() {
        this._loadData();
        // -NONE-
    },
    getBoards: function() {
        return this._data.boards;
        // the boards are retrieved and then the callback function is called with the boards
        // -3-
    },
    getBoard: function(boardId, callback) {
        // the board is retrieved and then the callback function is called with the board
        // -4-
    },
    getStatuses: function() {
        // console.log(this._data.statuses);
        return this._data.statuses;
        // the statuses are retrieved and then the callback function is called with the statuses
        // -3-
    },
    getStatus: function(statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
        // -4-
    },
    getCards: function() {
        return this._data.cards;
    },
    getCardsByBoardId: function(boardId) {
        var list = [];
        var cards = this._data['cards'];
        for (dict of cards){
            if (dict["board_id"] == boardId){
                list.push(dict);
            }
        }
        return list;
        // the cards are retrieved and then the callback function is called with the cards
        // -3-
    },
    getCard: function(cardId) {
        for (dict in this._data[cards]){
            if (dict["id"] == cardId){
                return dict;
            }
        }
        // the card is retrieved and then the callback function is called with the card
        // -4-
    },
    createNewBoard: function(id, boardTitle) {
        var newBoard = {'id': id, 'title': boardTitle, 'is_active': 'true'}
        this._data['boards'].push(newBoard);
        this._saveData(this._data);
        location.reload(false);

        // creates new board, saves it and calls the callback function with its data
        // -5- Yaro
    },
    createNewCard: function(id, cardTitle, boardId, statusId) {
        var newCard = {'id': id, 'title': cardTitle, 'board_id': boardId, 'status_id': statusId};
        this._data['cards'].push(newCard);
        this._saveData(this._data);
        // creates new card, saves it and calls the callback function with its data
        // -5- Yaro
    }
    // here comes more features
};


// TOTAL:
// 37
