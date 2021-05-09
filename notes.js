const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => note.title === title);
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body,
        });
        saveNotes(notes);
        console.log(chalk.yellow.inverse("New note added!"));
    } else {
        console.log(chalk.red.inverse("Note title taken"));
    }
};

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);
    if (notesToKeep.length !== notes.length) {
        console.log(chalk.green.inverse("Note removed!"));
        saveNotes(notesToKeep);
    } else {
        console.log(
            chalk.red.inverse("Note with title: " + title + " does not exist")
        );
    }
};

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.blue.inverse("Your notes"));

    notes.forEach((note) => console.log(note.title));
};

const readNote = (title) => {
    const notes = loadNotes();
    const foundNote = notes.find((note) => note.title === title);
    if (foundNote) {
        console.log(chalk.inverse.italic(foundNote.title));
        console.log(foundNote.body);
    } else {
        console.log(chalk.red.inverse("Note not found"));
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
};
