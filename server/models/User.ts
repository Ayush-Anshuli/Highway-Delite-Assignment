import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  dateOfBirth: Date;
  email: string;
  password: string;
  googleId?: string;
  photoURL?: string;
  emailVerified?: boolean;
  provider?: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [50, 'Name cannot exceed 50 characters']
    }, 
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long']
    },
    googleId: {
      type: String,
      sparse: true
    },
    photoURL: {
      type: String
    },
    emailVerified: {
      type: Boolean,
      default: false
    },
    provider: {
      type: String,
      enum: ['local', 'google.com', 'facebook.com'],
      default: 'local'
    },
    lastLogin: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
userSchema.index({ email: 1 });

export const User = mongoose.model<IUser>('User', userSchema); 