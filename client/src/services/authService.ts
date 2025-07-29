const API_BASE_URL = 'http://localhost:5000/api';

export const saveGoogleUserToBackend = async (userData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/google-auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: userData.uid,
        email: userData.email,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        providerId: userData.providerId,
        emailVerified: userData.emailVerified
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to save user data');
    }

    return data;
  } catch (error) {
    console.error('Error saving Google user to backend:', error);
    throw error;
  }
}; 