import main
import data_manager
import persistence

def check_user_login(dict):
    login = dict['email']
    if data_manager.get_user_password(login) != []:
        return True

def check_user_password(dict):
    login = dict['email']
    password = dict['password']
    if data_manager.get_user_password(login) != []:
        if password == data_manager.get_user_password(login)[0]['users_password']:
            return True

def get_user_id(dict):
    login = dict['email']
    return data_manager.get_user_id(login)[0]['users_id']
    



# def check_user_login_and_password(dict):
#     login = dict['email']
#     password = dict['password']
#     user_in_database = data_manager.check_if_user_in_database(user_input_login)
#     if user_in_database == []:
#         check_if_password_correct = "wrong"
#         return user_in_database, check_if_password_correct
#     check_if_password_correct = data_manager.check_if_password_correct(user_input_login)
#     check_if_password_correct = check_if_password_correct[0]['user_password']
#     if user_in_database != [] and check_if_password_correct == user_input_password:
#         global current_user
#         current_user = user_in_database[0]['user_id']
#         # change_user_reputation()

#         return user_in_database, check_if_password_correct
#     else:
#         check_if_password_correct = "wrong"
#         return user_in_database, check_if_password_correct