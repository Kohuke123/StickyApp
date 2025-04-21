const note_title_input = document.getElementById("note-title-input")
const note_add_button = document.getElementById("note-add-button")
const notes_table_body = document.getElementById("notes-table-body")
const note_id_title = document.getElementById("note-id-title")

eel.expose
function displayNote(note) {
  let tr = document.createElement("tr") // Tablerow
  let td = document.createElement("td") // Title cell
  td.innerText = note['title'];

  tr.appendChild(td);
  notes_table_body.appendChild(tr);

  note_title_input.value = "";

  tr.addEventListener("click", () => {
    openNoteWindow(note.id);
  })
}

// Function to display all the notes
eel.expose
function displayAllNotes(notes) {

  for (let note of notes["notes"]) {
    displayNote(note);
  }
}

eel.expose
function openNoteWindow(noteId) {
  window.open(
    `editor.html?noteId=${noteId}`,
    `NoteWindow-${noteId}`,
    "width=300,height=400");

  let h = getElementById("h3");
  h.innerText = note['title'];
  note_id_title.appendChild(h);
}

// Clicking the Add button
note_add_button.addEventListener("click", (event) => { // When the user clicks on the add button
  let content = note_title_input.value; // Gets the title and calls py fun to store note to json file
  if (content != "") { // Checks if the input is empty or not, then saves it and displays notes
    eel.create_note(content)(displayNote)
  }

})

// eel.list_note()(displayAllNotes);
document.addEventListener("DOMContentLoaded", () => {
  function tryListNotes() {
    if (eel._websocket.readyState === WebSocket.OPEN) {
      eel.list_note()(displayAllNotes);
    } else {
      // Try again in 100ms
      setTimeout(tryListNotes, 100);
    }
  }
  tryListNotes();
});