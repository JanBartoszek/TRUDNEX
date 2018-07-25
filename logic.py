import persistence
import time
import persistence



@persistence.connection_handler
def test(cursor):
    cursor.execute("""
                SELECT *
                FROM users;
                """)
    
    question = cursor.fetchall()
    return question





# This is an example what generally new part of the script should look like.
@persistence.connection_handler
def get_all_questions(cursor,col,direction):
        
        cursor.execute("""
                    SELECT title, submission_time, view_number, id FROM question
                    ORDER BY """ +col+ """ """+direction+""" ;
                   """)
        
        question = cursor.fetchall()
        return question

@persistence.connection_handler       
def view_counter(cursor,id):
    cursor.execute("""

                    UPDATE question
                    SET view_number = view_number+1
                    WHERE id =""" +id+""";
                    """)
        
        
   
@persistence.connection_handler
def get_all_tags(cursor):
    cursor.execute("SELECT id, name FROM tag")
    all_tags = cursor.fetchall()

    return all_tags


@persistence.connection_handler
def get_users_with_their_attributes(cursor):
    query = """ 
        SELECT id, users_name, registration_date
        FROM users
        """

    cursor.execute(query)

    users_list_with_attributes = cursor.fetchall()

    return users_list_with_attributes



@persistence.connection_handler
def get_tags_by_question_id(cursor, question_id):
    cursor.execute("""
                SELECT tag.id, tag.name FROM question_tag, tag 
                WHERE question_tag.question_id = %(question_id)s and question_tag.tag_id = tag.id;
                """, {'question_id': question_id})

    tags_by_question_id = cursor.fetchall()

    return tags_by_question_id


@persistence.connection_handler
def get_counts_of_tags_occurrence(cursor):
    query = """ 
        SELECT tag.name, count(question_id) AS count
        FROM question_tag
        JOIN tag ON
            question_tag.tag_id = tag.id
        GROUP BY tag.id
        """

    cursor.execute(query)

    counted_tags = cursor.fetchall()

    return counted_tags


@persistence.connection_handler
def add_tags_to_question(cursor, question_id, tag):
    cursor.execute("SELECT id FROM tag WHERE name like %(tag)s", {'tag': tag})
    tag_id = cursor.fetchone()

    if not tag_id:
        cursor.execute("""
                            INSERT INTO tag(name) VALUES(%(tag)s)
                            RETURNING id;       
                            """, {'tag': tag})
        tag_id = cursor.fetchone()

    cursor.execute("INSERT INTO question_tag VALUES(%(question_id)s, %(tag_id)s)",
                   {'question_id': int(question_id), 'tag_id': tag_id['id']})


# here below all finctions are still not changed. Need to be changed.
@persistence.connection_handler
def get_question_by_id(cursor, id):
        cursor.execute("""
                    SELECT title, id, submission_time, view_number, vote_number, message, image, users_id FROM question
                    WHERE id="""+str(id)+""";
                   """)
        
        question = cursor.fetchall()
        return question

@persistence.connection_handler
def get_comments_to_anwser_by_question_id(cursor, question_id):
    cursor.execute("""
                SELECT * FROM comment
                WHERE answer_id in (select id FROM answer where question_id = %s);
                """,(question_id))

    comments = cursor.fetchall()
    return comments

@persistence.connection_handler
def get_comment_by_question_id(cursor, question_id):

    cursor.execute("""
                SELECT * FROM comment
                WHERE question_id=%s;
                """,(question_id))
        
    comment = cursor.fetchall()
    return comment

@persistence.connection_handler
def get_answers_by_question_id(cursor,id):
    cursor.execute("""
                    SELECT id ,message, submission_time, users_id, accepted from Answer
                    WHERE question_id="""+str(id)+""" ORDER BY id;
                   """)
    answers = cursor.fetchall()

    return answers

@persistence.connection_handler
def get_answer_by_anwser_id(cursor, answer_id):
    cursor.execute("""
                    SELECT * from Answer
                    WHERE id=%s;
                   """, (answer_id))

    answer = cursor.fetchone()
    return answer    

@persistence.connection_handler
def delete_tag(cursor, question_id, tag_id):
    cursor.execute(""" 
        DELETE FROM question_tag
        WHERE question_id = %(question_id)s AND tag_id = %(tag_id)s;
        """, {'question_id': question_id, 'tag_id': tag_id})

    cursor.execute(""" 
        SELECT tag_id FROM question_tag
        WHERE tag_id = %(tag_id)s;
    """, {'tag_id': tag_id})

    references_to_tag = cursor.fetchall()

    if not references_to_tag:
        cursor.execute(""" 
        DELETE FROM tag
        WHERE id = %(tag_id)s;
        """, {'tag_id': tag_id})

@persistence.connection_handler
def process_new_question(cursor, new_title, new_question, image, author_id):
    a = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    cursor.execute("""
                    INSERT INTO Question(submission_time, view_number, vote_number, title, message, image, users_id)
                    VALUES (%s, 0, 0, %s, %s, %s, %s) RETURNING id
                    ;
                   """, (a, new_title, new_question, image, author_id))

    question = cursor.fetchall() 

@persistence.connection_handler
def process_new_answer(cursor, id, new_answer, author_id):
    a= time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    cursor.execute("""
                    INSERT INTO Answer(submission_time, vote_number, question_id, message, image, users_id)
                    VALUES (%s, 0, %s, %s, null, %s) RETURNING id
                    ;
                   """, (a, id, new_answer, author_id))

    answers = cursor.fetchall()

@persistence.connection_handler
def process_new_comment_added_to_anwser(cursor, anwser_id, new_comment):
    current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    
    cursor.execute("""
                INSERT INTO comment(answer_id, message, submission_time) 
                VALUES(%s,%s,%s);
                """, (anwser_id, new_comment, current_time))


def new_id(data_base):
    highest=0
    for elem in data_base:
        if int(elem.get("id"))>0:
            highest=int(elem.get("id"))
        else:pass
    return highest+1
    
def post_time():
    return int(time.time())




@persistence.connection_handler
def process_new_comment(cursor, question_id, answer_id, new_comment, user_to_bind_to_comment):
    a= time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    if answer_id=='no answer':
        cursor.execute("""
                        INSERT INTO Comment(question_id, answer_id, message, submission_time, edited_count, users_id)
                        VALUES (%s, null, %s, %s, 0, %s) RETURNING id;
                   """, (question_id, new_comment, a, user_to_bind_to_comment))
        
        comment = cursor.fetchall()
        return comment
    else:
        cursor.execute("""
                        INSERT INTO Comment(question_id, answer_id, message, submission_time, edited_count, users_id)
                        VALUES (%s, %s, %s, %s, 0, %s) RETURNING id;
                   """, (question_id, answer_id, new_comment, a, user_to_bind_to_comment))
        
        comment = cursor.fetchall()
        return comment

@persistence.connection_handler
def search_question(cursor, search_phrase):
    cursor.execute("""
                    SELECT title, submission_time, view_number, id FROM question
                    WHERE title ILIKE '%""" + search_phrase + """%'
                    """)
    found_phrases_question = cursor.fetchall()
    print(found_phrases_question)
    cursor.execute("""
                    SELECT question.title, question.submission_time, question.view_number, question.id, question.id, question.title FROM question
                    JOIN answer ON (question.id=answer.question_id)
                    WHERE answer.message ILIKE '%""" + search_phrase + """%'
                    """)
    found_phrases_answer = cursor.fetchall()

    found_phrases_multiples = found_phrases_question + found_phrases_answer
    found_phrases = []
    for question in found_phrases_multiples:
        if question in found_phrases:
            pass
        else:
            found_phrases += [question]
        
    return found_phrases

@persistence.connection_handler
def get_user_list(cursor):
        
        cursor.execute("""
                    SELECT users_name FROM users;
                   """)
        
        user_list = cursor.fetchall()
        return user_list

@persistence.connection_handler
def process_new_user(cursor, login):
    a = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    cursor.execute("""
                    INSERT INTO users(users_name, registration_date)
                    VALUES (%s, %s) RETURNING id
                    ;
                   """, (login,a))

    question = cursor.fetchall() 

@persistence.connection_handler
def newest(cursor):
        
        cursor.execute("""
                    SELECT title, submission_time, view_number, id FROM question
                    ORDER BY submission_time DESC LIMIT 5 ;
                   """)
        
        latest5 = cursor.fetchall()
        return latest5

@persistence.connection_handler
def get_all_users_names(cursor):
    cursor.execute("""
                    SELECT id, users_name FROM users;
                   """)
    all_users = cursor.fetchall()
    return all_users

@persistence.connection_handler
def get_question_by_user_id(cursor, user_id):
        cursor.execute("""
                    SELECT title, message, submission_time FROM question
                    WHERE users_id=%s;
                   """,(user_id))
        
        user_questions = cursor.fetchall()
        return user_questions

@persistence.connection_handler
def get_answer_by_user_id(cursor, user_id):
        cursor.execute("""
                    SELECT q.title, answer.message, answer.question_id, answer.submission_time FROM answer
                    LEFT JOIN question q ON q.id=question_id
                    WHERE answer.users_id=%s
                    ORDER BY answer.submission_time DESC""",(user_id))
        
        user_answers = cursor.fetchall()
        return user_answers


@persistence.connection_handler
def get_comment_by_user_id(cursor, user_id):
        cursor.execute("""
                    SELECT question.title, a.message as answer, comment.message, comment.submission_time, COALESCE(a.question_id, comment.question_id) as question_id, comment.answer_id FROM comment
                    LEFT JOIN question q ON q.id=question_id
                    LEFT JOIN answer a ON a.id = answer_id
                    LEFT JOIN question ON ((a.question_id=question.id) OR (comment.question_id = question.id))
                    WHERE comment.users_id=%s
                    ORDER BY submission_time DESC
                   """,(user_id))
        
        user_comments = cursor.fetchall()
        return user_comments















@persistence.connection_handler
def get_user_info(cursor, user_id):
        cursor.execute("""
                    SELECT users_name, registration_date FROM users
                    WHERE id=%s;
                   """,(user_id))
        
        users = cursor.fetchall()
        return users


@persistence.connection_handler
def get_author_by_id(cursor, author_id):
    cursor.execute("""
                    SELECT users_name FROM users
                    WHERE id = 
                   """+ str(author_id) +";")
    theAutor = cursor.fetchall()[0]['users_name']
    return theAutor


@persistence.connection_handler
def mark_answer_as_accepted(cursor, answer_id):
    print(answer_id)
    query = """
        UPDATE answer
        SET accepted = true
        WHERE id = %s;
        """

    vars = (answer_id,)
    
    try:
        cursor.execute(query, vars)
    except Exception as exception:
        raise exception
        


# if __name__ == "__main__":
