import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const bookSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    reviews: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
bookSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
bookSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Book = mongoose.model('Book', bookSchema);

export default User;
