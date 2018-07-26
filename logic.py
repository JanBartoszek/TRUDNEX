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
    

