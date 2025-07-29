import { Request, Response } from 'express';
import { User, IUser } from '../models/User';
import bcrypt from 'bcrypt';

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, dateOfBirth, email } = req.body;

    // Validate required fields
    if (!name || !dateOfBirth || !email || !req.body.password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, dateOfBirth, email, and password'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Validate date of birth
    const dob = new Date(dateOfBirth);
    if (isNaN(dob.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid date of birth'
      });
    }

    // Check if user is at least 18 years old
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    
    if (age < 18) {
      return res.status(400).json({
        success: false,
        message: 'User must be at least 18 years old'
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create new user
    const newUser = new User({
      name: name.trim(),
      dateOfBirth: dob,
      email: email.toLowerCase().trim(),
      password: hashedPassword
    });

    // Save user to database
    const savedUser = await newUser.save();

    // Return success response (excluding sensitive data)
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        dateOfBirth: savedUser.dateOfBirth,
        createdAt: savedUser.createdAt
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle mongoose validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      const validationError = error as any;
      const errorMessages = Object.values(validationError.errors).map((err: any) => err.message);
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errorMessages
      });
    }

    // Handle duplicate key error (email already exists)
    if (error instanceof Error && error.name === 'MongoServerError') {
      const mongoError = error as any;
      if (mongoError.code === 11000) {
        return res.status(409).json({
          success: false,
          message: 'User with this email already exists'
        });
      }
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, { __v: 0 });
    
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id, { __v: 0 });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password'
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Return success response (excluding password)
    res.status(200).json({
      success: true,
      message: 'Sign in successful',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { 
      uid, 
      email, 
      displayName, 
      photoURL, 
      providerId,
      emailVerified 
    } = req.body;

    // Validate required fields
    if (!uid || !email) {
      return res.status(400).json({
        success: false,
        message: 'Google authentication data is incomplete'
      });
    }

    // Check if user already exists
    let user = await User.findOne({ email: email.toLowerCase() });
    
    if (user) {
      // User exists, update last login or any other fields if needed
      user = await User.findOneAndUpdate(
        { email: email.toLowerCase() },
        { 
          $set: { 
            lastLogin: new Date(),
            updatedAt: new Date()
          }
        },
        { new: true }
      );
    } else {
      // Create new user with Google data
      const newUser = new User({
        name: displayName || 'Google User',
        email: email.toLowerCase(),
        dateOfBirth: new Date('1990-01-01'), // Default date for Google users
        password: `google_${uid}`, // Placeholder password for Google users
        googleId: uid,
        photoURL: photoURL,
        emailVerified: emailVerified,
        provider: providerId || 'google.com',
        lastLogin: new Date()
      });

      user = await newUser.save();
    }

    // Return success response
    if (user) {
      res.status(200).json({
        success: true,
        message: 'Google authentication successful',
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          photoURL: user.photoURL || null,
          emailVerified: user.emailVerified || false,
          provider: user.provider || 'local',
          createdAt: user.createdAt,
          lastLogin: user.lastLogin || null
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to create or update user'
      });
    }

  } catch (error) {
    console.error('Google auth error:', error);
    
    // Handle mongoose validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      const validationError = error as any;
      const errorMessages = Object.values(validationError.errors).map((err: any) => err.message);
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errorMessages
      });
    }

    // Handle duplicate key error
    if (error instanceof Error && error.name === 'MongoServerError') {
      const mongoError = error as any;
      if (mongoError.code === 11000) {
        return res.status(409).json({
          success: false,
          message: 'User with this email already exists'
        });
      }
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}; 