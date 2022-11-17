import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  NextOrObserver,
  User
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
  QueryDocumentSnapshot
} from "firebase/firestore";
import { CategoriesArray } from "../../store/categories/category.type";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqXIKJ_X6bJdXvyvFnZ8nubVx_k9tuN7w",
  authDomain: "e-commerce-reactdb-1c9fc.firebaseapp.com",
  projectId: "e-commerce-reactdb-1c9fc",
  storageBucket: "e-commerce-reactdb-1c9fc.appspot.com",
  messagingSenderId: "141634092541",
  appId: "1:141634092541:web:52f0c7945d2ed571d76d94"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleprovider = new GoogleAuthProvider();

googleprovider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleprovider);

export const db = getFirestore();

export type ObjectsToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectsToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const DocRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(DocRef, object);
  });
  await batch.commit();
  console.log("set in firebase");
};

export const getCategoriesAndDocuments = async (): Promise<
  CategoriesArray[]
> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as CategoriesArray
  );

  // //get資料後map，不做categoryMap直接fetch
  // return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
  //  const querySnapshot = await getDocs(q);
  //   const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //     const { title, items } = docSnapshot.data();//fetch
  //     acc[title.toLowerCase()] = items;
  //     return acc;
  //   }, {});
  //return categoryMap;
};

export type AdditionalInformation = {
  displayName?: string;
};

export type Userdata = {
  createdAt: Date;
  displayName: string;
  email: string;
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<Userdata>> => {
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
        ...additionalInformation
      });
    } catch (error) {
      console.log(error);
    }
  }
  return userSnapshot as QueryDocumentSnapshot<Userdata>;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
  onAuthStateChanged(auth, callback);
};
//pratice
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
