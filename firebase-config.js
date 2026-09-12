/**
 * PulsePM - Firebase Backend Configuration
 * 
 * Instructions:
 * 1. Go to https://console.firebase.google.com/
 * 2. Create a new project (e.g. "pulsepm-app")
 * 3. Go to Project Settings -> General -> Your apps -> Web app (</>)
 * 4. Copy the firebaseConfig values and paste them below:
 */

const firebaseConfig = {
  apiKey: "AIzaSyCp8Vb9l-PYTm_M8Th86_p4DDiJUiJJd6M",
  authDomain: "pulsepm-prod.firebaseapp.com",
  projectId: "pulsepm-prod",
  storageBucket: "pulsepm-prod.firebasestorage.app",
  messagingSenderId: "133576646613",
  appId: "1:133576646613:web:a46540f910b840fbfde75c",
  measurementId: "G-0361ZC5WB4"
};

/**
 * Checks if real Firebase credentials have been configured
 */
function isFirebaseConfigured() {
  return (
    firebaseConfig &&
    firebaseConfig.apiKey &&
    firebaseConfig.apiKey !== "YOUR_API_KEY" &&
    firebaseConfig.projectId &&
    firebaseConfig.projectId !== "YOUR_PROJECT_ID"
  );
}

// Expose globally for browser
window.PulseFirebaseConfig = {
  config: firebaseConfig,
  isConfigured: isFirebaseConfigured
};
