//saga pratice
import { takeLatest, all, call, put } from "redux-saga/effects";
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  getCategoriesAndDocuments,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser
} from "../../utils/firebase/firebase.utils";
import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed
} from "./user.action";
import { USER_ACTION_TYPES } from "./user.type";

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}
//>
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
    //
    alert("please check email or password");
    return error;
  }
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

//<
export function* getSnapshotFromUserAuth(userAuth, additionDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionDetails
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

//
export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("email already in use");
    }
    yield put(signUpFailed(error));
  }
}

export function* signAfterSignUp({ payload: { user, additionDetail } }) {
  yield call(getSnapshotFromUserAuth, user, additionDetail);
}

export function* OnCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}
//>
export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}
//<
export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}
//>
export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

//<
export function* userSaga() {
  yield all([
    call(OnCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignOutStart)
  ]);
}
