import { auth, db, } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
const updateUserPhoneNumber = async (userId, phoneNumber) => {
  try {
    // Reference to the user document in Firestore
    const userDocRef = doc(db, "users", userId);

    // Update the phone number field in the user document
    await updateDoc(userDocRef, {
      phoneNumber: phoneNumber,
    });

    console.log(`Phone number updated successfully for user ${userId}`);
  } catch (error) {
    throw new Error(`Error updating phone number for user ${userId}: ${error}`);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  console.log(email, password, name);
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const userDocRef = doc(db, "drivers", user.uid);
    await setDoc(userDocRef, {
      uid: user.uid,
      name,
      email,
    });
    return { success: true };
  } catch (error) {
    console.error(error);
  }
};

const loginWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const userId = res.user.uid;
    const userRef = doc(db, "drivers", userId);
    const userDoc = await getDoc(userRef);
    return {
      success: true,
      user: userDoc.data(),
    };
  } catch (err) {
    console.error(err);
  }
};

const loginWithPhoneNumber = async (phoneNumber, recaptchaVerifier) => {
  try {
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      recaptchaVerifier
    );
    return confirmationResult;
  } catch (err) {
    console.error(err);
  }
};

const verifyOTP = async (confirmationResult, otp) => {
  try {
    const result = await confirmationResult.confirm(otp);
    return result;
  } catch (err) {
    console.error(err);
  }
};

const logout = async () => {
  await signOut(auth);
  return { success: true };
};

export {
  loginWithEmailAndPassword,
  logout,
  registerWithEmailAndPassword,
  loginWithPhoneNumber,
  verifyOTP,
  updateUserPhoneNumber
};
