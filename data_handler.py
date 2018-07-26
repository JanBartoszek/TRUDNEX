import persistence
import time


@persistence.connection_handler
def test(cursor):
    cursor.execute(
                """
                    SELECT * FROM users;
                """)
    list_of_dicts = cursor.fetchall()
    return list_of_dicts



@persistence.connection_handler
def getBoards(cursor):
    cursor.execute(
                """
                    SELECT * FROM boards;
                """)
    list_of_dicts = cursor.fetchall()
    return list_of_dicts


    