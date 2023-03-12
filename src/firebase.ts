// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  initializeFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB37XPiVd4mcEQ7bQx3x8pFp9q5Y5B2DFs",
  authDomain: "jenn-hiller.firebaseapp.com",
  projectId: "jenn-hiller",
  storageBucket: "jenn-hiller.appspot.com",
  messagingSenderId: "876953165706",
  appId: "1:876953165706:web:cd93a735f29574f0917273",
  measurementId: "G-B41W7H9DJQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    // alert(err.message);
  }
};
export const logout = () => {
  signOut(auth);
};
declare global {
  // eslint-disable-next-line no-var
  var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined;
}
window.FIREBASE_APPCHECK_DEBUG_TOKEN=true;
export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LddwFIhAAAAALXSAfqvWEuUoO4sLL5R8PWefkvs"),
  isTokenAutoRefreshEnabled: true,
});
