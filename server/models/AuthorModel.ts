import mongoose from 'mongoose';

interface Author {
  uid: string;
  name: string;
}

const authorSchema = new mongoose.Schema<Author>(
  {
    uid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AuthorModel = mongoose.model('Author', authorSchema);
export default AuthorModel;
