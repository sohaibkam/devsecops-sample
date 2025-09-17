const noteService = require('../services/note.service');

// asyncHandler wraps controller and forwards errors to errorHandler
const { asyncHandler } = require('../middleware/asyncHandler');

const create = asyncHandler(async (req, res) => {
    const note = await noteService.createNote({ text: req.body.text });
    res.status(201).json(note);
});

const list = asyncHandler(async (req, res) => {
    const notes = await noteService.listNotes();
    res.json(notes);
});

module.exports = { create, list };
