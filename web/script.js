const note_title_input = document.getElementById("note-title-input")
const note_add_button = document.getElementById("note-add-button")
const notes_table_body = document.getElementById("notes-table-body")

eel.expose
function displayNote(note) {
    let tr = document.createElement("tr") // Tablerow
    let td = document.createElement("td") // Title cell
    td.innerText = note['title'];

    tr.appendChild(td);
    notes_table_body.appendChild(tr);

    note_title_input.value = "";
}

// Function to display all the notes
eel.expose
function displayAllNotes(notes) {

    for (let note of notes["notes"]) {
        displayNote(note);
    }
}

// Clicking the Add button
note_add_button.addEventListener("click", (event) => { // When the user clicks on the add button
    let content = note_title_input.value; // Gets the title and calls py fun to store note to json file
    if (content != "") { // Checks if the input is empty or not, then saves it and displays notes
        eel.create_note(content)(displayNote)
    }

})

eel.list_note()(displayAllNotes);