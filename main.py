import eel
import json

notes_count = 0 # VAriable to keep track of the number of notess
eel.init('web')

def read_data():
    with open("data.json", "r") as file:
        content = json.loads(file.read()) # Turns json data into py data so I can use it
    return content

def write_data(content):
    with open("data.json", "w") as file:
        file.write(json.dumps(content)) #Saves and turns python data into a json string
    return content

# @eel.expose
# Function to create a new note
# def create_note(title):
#     global notes_count

#     new_note = { # This dictionary assings a new id to every note
#         "id": notes_count + 1
#         "title": title
#     }

#     content = read_data()

eel.start('index.html', size=(300, 400))