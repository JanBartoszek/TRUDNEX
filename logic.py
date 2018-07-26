import main
import data_manager
import persistence

def check_user_login(dict):
    login = dict['email']
    if data_manager.get_user_password(login) != []:
        return True
    return False

def check_user_password(dict):
    login = dict['email']
    password = dict['password']
    if data_manager.get_user_password(login) != []:
        if password == data_manager.get_user_password(login)[0]['users_password']:
            return True
    return False

def get_user_id(dict):
    login = dict['email']
    return data_manager.get_user_id(login)[0]['users_id']

def get_boards(user_id):
    return data_manager.getBoards(user_id)

def get_statuses():
    return data_manager.getStatuses()

def get_cards(user_id):
    return data_manager.getCards(user_id)    
    

