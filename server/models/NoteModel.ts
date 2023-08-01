import mongoose from 'mongoose';

interface Note {
  content: string;
  folderId: string;
}

const noteSchema = new mongoose.Schema<Note>(
  {
    content: {
      type: String,
      required: true,
    },
    folderId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const NoteModel = mongoose.model('Note', noteSchema);
export default NoteModel;
