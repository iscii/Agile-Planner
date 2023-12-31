import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithEmailAndPassword,

  // updatePassword,
  // sendPasswordResetEmail,
  // EmailAuthProvider,
  // reauthenticateWithCredential
} from 'firebase/auth'

async function doCreateUserWithEmailAndPassword(email, password, displayName) {
  const auth = getAuth()
  await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(auth.currentUser, { displayName: displayName })
}

async function doSignInWithEmailAndPassword(email, password) {
  let auth = getAuth()
  await signInWithEmailAndPassword(auth, email, password)
}

async function doSignOut() {
  let auth = getAuth()
  await signOut(auth)
}

export {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignOut
}