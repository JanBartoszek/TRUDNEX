// It uses data_handler.js to visualize elements
let dom = {


    allowDrop: function (ev) {
        ev.preventDefault();
    },
    
    drag: function (ev) {
        ev.dataTransfer.setData("text", ev.target.id);
        var idOfDraggedElement = ev.target.id;
        var idOfBoard = idOfDraggedElement.substring(0,2);
        var listOfAcceptableStatuses = [];
        for (i=1; i < 5; i++){
            listOfAcceptableStatuses.push(idOfBoard + 's' + i);
        }
        localStorage.setItem('listOfAcceptableStatuses', JSON.stringify(listOfAcceptableStatuses));

    },
    
    drop: function (ev) {
        var listOfAcceptableStatuses = JSON.parse(localStorage.getItem('listOfAcceptableStatuses'));
        var firstFourCharsOfId = ev.target.id.substring(0,4);
        var fifthCharOfId = ev.target.id.substring(4,5);
        var target = document.getElementById(ev.target.id);

        if (listOfAcceptableStatuses.includes(ev.target.id)){
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
        } else if (listOfAcceptableStatuses.includes(firstFourCharsOfId) && fifthCharOfId == 'c'){
            ev.preventDefault();
            var data = ev.dataTransfer.getData("text");
            target.parentElement.appendChild(document.getElementById(data));
        }
    },


    createNewBoardButton: function(){
        var newBoardButton = document.createElement('button');
        newBoardButton.setAttribute('class', 'btn btn-default');
        newBoardButton.setAttribute('id', 'newBoardButton');
        newBoardButton.setAttribute('type', 'button');
        newBoardButton.setAttribute('data-toggle', 'modal');
        newBoardButton.setAttribute('data-target', '#my-modal');
        document.getElementById('newBoardbutton_container').appendChild(newBoardButton);
        document.getElementById('newBoardButton').innerHTML = 'New board';
        this.createModal();
    },


    createModal: function(){
        var modal = document.createElement('div');
        modal.setAttribute('class', 'modal fade');
        modal.setAttribute('id', 'my-modal');
        modal.setAttribute('role', 'dialog');
        document.getElementById('newBoardbutton_container').appendChild(modal);
        document.getElementById('my-modal').innerHTML =
        '<div class="modal-dialog">'
            + '<div class="modal-content">'
                + '<div class="modal-header">'
                    + '<h4 class="modal-title">Modal Header</h4>' 
                + '</div>' 
            + '<div class="modal-body">' 
                + '<form id="formNewBoardName" "dom.getNewName()">' 
                + 'New board title: <input type="text" name="inputNewBoardName"><br>'
                + '</form>'
            + '</div>' 
            + '<div class="modal-footer">' 
                + '<button type="submit" value="Submit" onclick = "dom.getNewName()" data-dismiss="modal">Submit</button>'
                + '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' 

            + '</div>' 
            + '</div>' 
        + '</div>'
    },


    getNewName: function() {
        var formContent = document.getElementById("formNewBoardName");
        var newBoardName = formContent.elements['inputNewBoardName'].value;
        var boards = dataHandler.getBoards();
        var idOfTheLastBoard = boards.slice(-1)[0].id;
        console.log(idOfTheLastBoard);
        dataHandler.createNewBoard(idOfTheLastBoard + 1, newBoardName);
    },


    loadBoards: function() {
                                        // this is where i test ajax
        
        
        function loadDoc() {
            var xhttp = new XMLHttpRequest();       // this is just to test passing values through link(test/23)
            xhttp.open("POST", "http://0.0.0.0:5050/test/23", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("name=Bilbo&surname=Baggins");
        }
        loadDoc();
        
        
        var boardsOld = dataHandler.getBoards();
        console.log(boardsOld);
                                             // ok so now i am trying to get boards from main and data_handler
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var boardsJson = this.responseText;
                console.log(boardsJson);
                var boardsObject = JSON.parse(boardsJson);
                console.log(boardsObject);
                dom.showBoards(boardsObject);
            }
        };
        xhttp.open("GET", "http://0.0.0.0:5050/getBoards", true);
        xhttp.send(); 

        
        
        
        // retrieves boards and makes showBoards called
    // -2-
    },


    showBoards: function(boards) {
        console.log(boards)
        var boards_container = document.getElementById('boards');
        boards.forEach(function(board){
            console.log(board)
            
            var div = document.createElement('div');
            var nav = document.createElement('nav');
            var boardContent = document.createElement('div');

            div.setAttribute('id','b' + board.boards_id);
            div.setAttribute('class', 'container');
            boards_container.appendChild(div);

            nav.setAttribute('id','b' + board.boards_id + '_navbar');
            nav.setAttribute('class', "navbar navbar-inverse");
            nav.innerHTML = '<div class="navbar-header">' + board.title + '</div>' + '<button data-toggle="collapse" data-target="#' + 'b' + board.id + '_boardContent' + '">' + 'DETAILS' + '</button>';
            boards_container.children[board.boards_id - 1].appendChild(nav);

            boardContent.setAttribute('id','b' + board.boards_id + '_boardContent');
            boardContent.setAttribute('class', 'collapse');
            boardContent.innerHTML = '<div id="newCardbutton_container' + board.boards_id + '">' + '</div>';
            boards_container.children[board.boards_id - 1].appendChild(boardContent);
            dom.createNewCardButton(board.boards_id);
            

        }
        );


        // shows boards appending them to #boards div
        // it adds necessary event listeners also
    // -4-
    },

    createNewCardButton: function(boardId){
        var newCardButton = document.createElement('button');
        newCardButton.setAttribute('class', 'btn btn-default');
        newCardButton.setAttribute('id', 'newCardButton' + boardId);
        newCardButton.setAttribute('type', 'button');
        newCardButton.setAttribute('data-toggle', 'modal');
        newCardButton.setAttribute('data-target', '#card-modal' + boardId);
        document.getElementById('newCardbutton_container' + boardId).appendChild(newCardButton);
        document.getElementById('newCardButton' + boardId).innerHTML = 'New card';
        this.createModalForCards(boardId);
    },


    createModalForCards: function(boardId){
        var modal = document.createElement('div');
        modal.setAttribute('class', 'modal fade');
        modal.setAttribute('id', 'card-modal' + boardId);
        modal.setAttribute('role', 'dialog');
        document.getElementById('newCardbutton_container' + boardId).appendChild(modal);
        document.getElementById('card-modal' + boardId).innerHTML =
        '<div class="modal-dialog">'
            + '<div class="modal-content">'
                + '<div class="modal-header">'
                    + '<h4 class="modal-title">Modal Header</h4>' 
                + '</div>' 
            + '<div class="modal-body">' 
                + '<form id="formNewCardName' + boardId + '" "dom.getNewCardName(' + boardId + ')">' 
                + 'New card title: <input type="text" name="inputNewCardName"><br>'
                + '</form>'
            + '</div>' 
            + '<div class="modal-footer">' 
                + '<button type="submit" value="Submit" onclick = "dom.getNewCardName(' + boardId + ')" data-dismiss="modal">Submit</button>'
                + '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' 

            + '</div>' 
            + '</div>' 
        + '</div>'
    },


    getNewCardName: function(boardId, statusId=1) {
        var formContent = document.getElementById("formNewCardName" + boardId);
        var newCardName = formContent.elements['inputNewCardName'].value;
        var cards = dataHandler.getCards();
        var idOfTheLastCard = cards.slice(-1)[0].id;
        console.log(idOfTheLastCard)
        dataHandler.createNewCard(idOfTheLastCard + 1, newCardName, boardId, statusId);
    },


    loadStatuses:function(){
        var statuses = dataHandler.getStatuses();
        this.showStatuses(statuses);
        
    },



    showStatuses: function(statuses){

        var numberOfBoards = dataHandler.getBoards();
        
        numberOfBoards = numberOfBoards.length;
        for (var i=1 ; i<=numberOfBoards ; i++){
        statuses.forEach(function(status){
            // var paragraph = document.createElement('p');
            var div = document.createElement('div');
            // paragraph.setAttribute('class', 'label');
            // paragraph.setAttribute('id','b' + i + 'label' + status.id);
            div.setAttribute('id','b' + i + 's' + status.id);
            div.setAttribute('class', 'status');
            div.setAttribute('ondrop', 'dom.drop(event)');
            div.setAttribute('ondragover', 'dom.allowDrop(event)');
            div.innerHTML = status.name;
            div.innerHTML = "<div class = 'labels' id = s"+status.id+"1>"+"</div>"
            // paragraph.innerHTML = status.name;
            var statuses_container = document.getElementById('b' + (i) + '_boardContent');
            // statuses_container.appendChild(paragraph);
            statuses_container.appendChild(div);
            }    
        );
        this.loadCards(i);
    }
    },
    loadCards: function(boardId) {
        var cards = dataHandler.getCardsByBoardId(boardId);
        this.showCards(cards);
        // retrieves cards and makes showCards called
    // -4-    
    },
    showCards: function(cards) {

        
        cards.forEach(function(card){       
            var div = document.createElement('div');
            div.setAttribute('id','b' + card["board_id"] + 's' + card["status_id"] + 'c' + card.id);
            div.setAttribute('class', 'card');
            div.setAttribute('draggable', 'true');
            div.setAttribute('ondragstart', 'dom.drag(event)');
            div.innerHTML = card.title;
            var card_container = document.getElementById('b' + card["board_id"] + 's' + card["status_id"] );
            card_container.appendChild(div);   
        }   
        );
        
        // shows the cards of a board
        // it adds necessary event listeners also
    // -4-
    },
    appendToElement: function(elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prependChild(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    }
    
    // here comes more features
}


// TOTAL: 14
