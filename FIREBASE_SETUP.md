# 🔥 How to Connect PulsePM to Firebase (5-Minute Guide)

This guide walks you through setting up real authentication (Google OAuth, Phone SMS OTP, and Email) and real-time database sync using Firebase.

---

### Step 1: Create a Free Firebase Project
1. Open [Firebase Console](https://console.firebase.google.com/) and sign in with your Google account.
2. Click **"Add project"** (or **"Create a project"**).
3. Enter a project name (e.g., `pulsepm-prod`) and click **Continue**.
4. (Optional) Disable or enable Google Analytics, then click **Create project**.

---

### Step 2: Register Your Web App & Get Config Keys
1. On your project overview page, click the Web icon (`</>`) to add a web application.
2. Enter an app nickname (e.g. `PulsePM Web`) and click **Register app**.
3. Under **"Add Firebase SDK"**, look for the `const firebaseConfig = { ... }` snippet.
4. Copy the values:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789...",
     appId: "1:123456789:web:..."
   };
   ```
5. Open [`firebase-config.js`](file:///Users/rajeev/.gemini/antigravity/scratch/project-management-app/firebase-config.js) in this project and paste these values.

---

### Step 3: Enable the 3 Authentication Providers
In Firebase Console, go to **Build -> Authentication**, click **Get Started**, then open the **Sign-in method** tab:

1. **Email/Password**:
   * Click **Email/Password**.
   * Toggle **Enable** to ON and click **Save**.
2. **Phone Number (SMS OTP)**:
   * Click **Phone**.
   * Toggle **Enable** to ON.
   * (Optional for testing without SMS charges) Add a test phone number like `+1 555-382-9104` with test verification code `749210`.
   * Click **Save**.
3. **Google Sign-In (OAuth)**:
   * Click **Google**.
   * Toggle **Enable** to ON.
   * Choose your support email from the dropdown.
   * Click **Save**.

---

### Step 4: Enable Cloud Firestore Database
1. In Firebase Console, navigate to **Build -> Firestore Database**.
2. Click **Create database**.
3. Choose a location closest to your users (e.g. `us-central` or `asia-south1`).
4. Select **Start in test mode** (allows read/writes during initial setup and testing).
5. Click **Enable**.

#### Recommended Security Rules (for Production):
In Firebase Console -> **Firestore Database -> Rules**, you can publish:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User profile access
    match /users/{userId} {
      allow read, write: if request.auth != null;
    }
    // Projects collection access
    match /projects/{projectId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

### Step 5: Authorize Your Domain
In Firebase Console -> **Authentication -> Settings -> Authorized domains**:
* `localhost` is already authorized by default for local development.
* When deploying to your live URL (e.g. `yourname.vercel.app` or `yourdomain.com`), click **Add domain** and enter your domain name.

---

### Step 6: Test Real Collaboration!
Once you paste your keys into `firebase-config.js`, refresh the application:
* The header badge will display **"🔥 Firebase: Live"**.
* Any project created or task completed will instantly sync to Cloud Firestore.
* Teammates can join projects via 6-digit join codes across different browsers/devices and receive live updates in real time!
