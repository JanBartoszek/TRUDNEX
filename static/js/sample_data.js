// It is just an idea how you can structure your data during your page is running.
// You can use it for testing purposes by simply copy/paste/run in the Console tab in your browser

let keyInLocalStorage = 'proman-data';

let sampleData = {
    "statuses": [
        {
            "id": 1,
            "name": "New"
        },
        {
            "id": 2,
            "name": "In progress"
        },
        {
            "id": 3,
            "name": "Testing"
        },
        {
            "id": 4,
            "name": "Done"
        }
    ],
    "boards": [
        {
            "id": 1,
            "title": "ASK MATE PROJECT TW1",
            "is_active": true
        },
        {
            "id": 2,
            "title": "ASK MATE PROJECT TW2",
            "is_active": true
        },
        {
            "id": 3,
            "title": "ASK MATE PROJECT TW3",
            "is_active": true
        },
        {
            "id": 4,
            "title": "PRO-MAN (TRELLO) TW1",
            "is_active": true
        }
    ],
    "cards": [
        {
            "id": 1,
            "title": "agile planning",
            "board_id": 1,
            "status_id": 1,
            "order": 3
        },
        {
            "id": 2,
            "title": "get user id",
            "board_id": 1,
            "status_id": 2,
            "order": 2
        },
        {
            "id": 3,
            "title": "save data to DB",
            "board_id": 1,
            "status_id": 4,
            "order": 1
        },
        {
            "id": 4,
            "title": "write a SQL querry",
            "board_id": 2,
            "status_id": 1,
            "order": 3
        },
        {
            "id": 5,
            "title": "refactoring of the code",
            "board_id": 2,
            "status_id": 2,
            "order": 2
        },
        {
            "id": 6,
            "title": "flask server, decorators",
            "board_id": 2,
            "status_id": 3,
            "order": 1
        },
        {
            "id": 7,
            "title": "presentation",
            "board_id": 1,
            "status_id": 3,
            "order": 1
        },
        {
            "id": 8,
            "title": "css corrections",
            "board_id": 2,
            "status_id": 4,
            "order": 1
        },
        {
            "id": 9,
            "title": "funkcja 1 ",
            "board_id": 1,
            "status_id": 1,
            "order": 2
        },{
            "id": 10,
            "title": "funkcja 2",
            "board_id": 1,
            "status_id": 1,
            "order": 3
        },{
            "id": 11,
            "title": "funkcja 3",
            "board_id": 1,
            "status_id": 1,
            "order": 4
        },{
            "id": 12,
            "title": "funkcja 4",
            "board_id": 1,
            "status_id": 2,
            "order": 2
        },
    ]
};

if (localStorage.getItem('proman-data') === null) {
localStorage.setItem(keyInLocalStorage, JSON.stringify(sampleData));
};

