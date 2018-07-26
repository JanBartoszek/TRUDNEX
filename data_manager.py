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


# @persistence.connection_handler
# def get_user_password(cursor, user_password):
#     cursor.execute(
#         sql.SQL("""
#                     SELECT users_password FROM "users"
#                     WHERE users_username = %(user_password)s;
#                 """), {'user_password': user_password}
#                    )
#     user = cursor.fetchall()
#     return user