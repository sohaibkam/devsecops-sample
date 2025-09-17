const Note = require('../models/note.model');

async function createNote(payload) {
  // business rules would go here (validation beyond schema, events, etc.)
    const n = new Note(payload);
    return n.save();
}

async function listNotes(limit = 50) {
    return Note.find().sort({ createdAt: -1 }).limit(limit);
}

module.exports = { createNote, listNotes };
