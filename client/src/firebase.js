import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-V5UQG8bqxLy_wPrmxTWc1rpTb1zWRqA",
  authDomain: "authentication-35080.firebaseapp.com",
  projectId: "authentication-35080",
  storageBucket: "authentication-35080.firebasestorage.app",
  messagingSenderId: "18674963166",
  appId: "1:18674963166:web:360c325a401f824a91e84f",
  measurementId: "G-75Y6S5MPRC"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Google Sign In/Sign Up function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return {
      success: true,
      user: result.user,
      credential: result.credential
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Sign Out function
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return {
      success: true
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

export default app;