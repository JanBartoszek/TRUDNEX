import persistence

from psycopg2 import sql, Binary

@persistence.connection_handler
def get_user_password(cursor, user_login):
    cursor.execute(
        sql.SQL("""
                    SELECT users_password FROM "users"
                    WHERE users_username = %(user_login)s;
                """), {'user_login': user_login}
                   )
    user_password = cursor.fetchall()
    return user_password


@persistence.connection_handler
def get_user_id(cursor, user_login):
    cursor.execute(
        sql.SQL("""
                    SELECT users_id FROM "users"
                    WHERE users_username = %(user_login)s;
                """), {'user_login': user_login}
                   )
    user_id = cursor.fetchall()
    return user_id


@persistence.connection_handler
def test(cursor):
    cursor.execute(
                """
                    SELECT * FROM users;
                """)
    list_of_dicts = cursor.fetchall()
    return list_of_dicts



@persistence.connection_handler
def getBoards(cursor, user_id):
    cursor.execute(
        sql.SQL("""
                    SELECT * FROM boards
                    WHERE boards_users_id = %(user_id)s;
                """), {'user_id': user_id}
                   )
    list_of_dicts = cursor.fetchall()
    return list_of_dicts


@persistence.connection_handler
def addUser(cursor, user_name, user_password):
    cursor.execute("INSERT into users(users_username, users_password) VALUES (%s, %s)", 
    (user_name, user_password))


@persistence.connection_handler
def getStatuses(cursor):
    cursor.execute(
        sql.SQL("""
                    SELECT * FROM statuses;
                """)
                   )
    list_of_dicts = cursor.fetchall()
    return list_of_dicts


@persistence.connection_handler
def getCards(cursor, user_id):
    cursor.execute(
        sql.SQL("""
                    SELECT cards.* FROM cards
                    JOIN boards ON cards.cards_boards_id = boards.boards_id
                    WHERE boards_users_id = %(user_id)s;
                """), {'user_id': user_id}
                   )
    list_of_dicts = cursor.fetchall()
    return list_of_dicts
