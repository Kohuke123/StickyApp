const note_id_title = document.getElementById("note-id-title")

// Display the note title in the editor window 
eel.expose
function displayTitle(note){
    // First I check if the window is loaded
    if (document.addEventListener("DOMContentLoaded", () => {
        note_id_title.innerText = note['title']; // Puts the note’s title text into the element referred to by the variable
        note_id_title.setAttribute("noteId", note['title']); // Adds a custom attribude
    }));
    else{
        onsole.error("Invalid note object or missing title.");
    }
}
