const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const config = require('../config/config');
const Note = require('../models/note');

class StorageService {
  constructor() {
    this.storagePath = path.resolve(config.storagePath);
    this.ensureStorageDirectory();
  }

  async ensureStorageDirectory() {
    try {
      await fs.access(this.storagePath);
    } catch {
      await fs.mkdir(this.storagePath, { recursive: true });
    }
  }

  generateId() {
    return uuidv4();
  }

  getNotePath(id) {
    return path.join(this.storagePath, `${id}.json`);
  }

  async save(noteData) {
    const id = noteData.id || this.generateId();
    const note = new Note({ ...noteData, id });
    const filePath = this.getNotePath(id);
    
    await fs.writeFile(filePath, JSON.stringify(note.toJSON(), null, 2));
    return note;
  }

  async findById(id) {
    const filePath = this.getNotePath(id);
    
    try {
      const data = await fs.readFile(filePath, 'utf8');
      const noteData = JSON.parse(data);
      return new Note(noteData);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return null;
      }
      throw error;
    }
  }

  async update(id, updates) {
    const existingNote = await this.findById(id);
    if (!existingNote) {
      return null;
    }

    const updatedNote = new Note({
      ...existingNote.toJSON(),
      ...updates,
      id,
      updatedAt: new Date().toISOString()
    });

    const filePath = this.getNotePath(id);
    await fs.writeFile(filePath, JSON.stringify(updatedNote.toJSON(), null, 2));
    return updatedNote;
  }

  async delete(id) {
    const filePath = this.getNotePath(id);
    
    try {
      await fs.unlink(filePath);
      return true;
    } catch (error) {
      if (error.code === 'ENOENT') {
        return false;
      }
      throw error;
    }
  }

  async findAll() {
    const files = await fs.readdir(this.storagePath);
    const notes = [];

    for (const file of files) {
      if (file.endsWith('.json')) {
        const id = file.replace('.json', '');
        const note = await this.findById(id);
        if (note) {
          notes.push(note);
        }
      }
    }

    return notes;
  }
}

module.exports = new StorageService();