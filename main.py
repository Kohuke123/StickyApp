import eel
import json

notes_count = 0
eel.init('web')
# Loading and opening the json file
def read_data():
    with open("data.json", "r") as file:
        content = json.loads(file.read()) # Turns json data into py data so I can use it
    return content

def write_data(content):
    with open("data.json", "w") as file:
        file.write(json.dumps(content)) 
    return content

#Function to create a new note
@eel.expose
def create_note(title):
    global notes_count

    new_note = { # This dictionary assings a new id to every note
        "id": notes_count + 1,
        "title": title,
        "content": ""
    }

    content = read_data()
    content['notes'].append(new_note) # Adds the new note to the list

    write_data(content) # Saving the updated list
    notes_count += 1 # Next note has a new id

    return new_note

# Function that saves the content of the note
@eel.expose
def write_note(note_id, text):
    data = read_data()

    for note in data['notes']: # For each element in that list, call it note and run the body of the loop
        if note['id'] == note_id:
            note['content'] = text
            break # So it does not contoniue to look at other notes
    else:
        print("No note with id={note_id}")



@eel.expose
def list_note(): # Lists all the notes in the json file
    return read_data()

# Creating a new json file when first starting the app
import os
if not os.path.exists('data.json'):
    file = open("data.json", "w")
    file.write(json.dumps({"notes":[]})) # Empy list of notes
    file.close()

else:
    content = read_data()
    notes_count = len(content['notes']) # Counts the existing notes
    
eel.start('index.html', size=(300, 400))