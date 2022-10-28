import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqXIKJ_X6bJdXvyvFnZ8nubVx_k9tuN7w",
  authDomain: "e-commerce-reactdb-1c9fc.firebaseapp.com",
  projectId: "e-commerce-reactdb-1c9fc",
  storageBucket: "e-commerce-reactdb-1c9fc.appspot.com",
  messagingSenderId: "141634092541",
  appId: "1:141634092541:web:52f0c7945d2ed571d76d94",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleprovider = new GoogleAuthProvider();

googleprovider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleprovider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const DocRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(DocRef, object);
  });
  await batch.commit();
  console.log("set in firebase");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  //get資料後map，不做categoryMap直接fetch
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
  //  const querySnapshot = await getDocs(q);
  //   const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //     const { title, items } = docSnapshot.data();//fetch
  //     acc[title.toLowerCase()] = items;
  //     return acc;
  //   }, {});
  //return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  addtionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...addtionalInformation,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
