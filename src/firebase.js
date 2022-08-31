import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider,signInWithPopup} from 'firebase/auth';
import { getFirestore} from 'firebase/firestore/lite';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_APP_API_KEY_GOOGLE,
    authDomain: process.env.REACT_APP_DOMAIN_AUTH,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDER_ID,
    appId: process.env.REACT_APP_APP_ID_GOOGLE,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,


  };




const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth =  getAuth(app);
const provider =   new GoogleAuthProvider();
export {auth, provider,signInWithPopup};
export default db;
