import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";

export async function getUserData() {
  try {
    const userRef = collection(db, "Users");
    const userUID = auth.currentUser.uid;

    if (userUID) {
      const userQuery = query(userRef, where("userUID", "==", userUID));
      const userData = getDocs(userQuery);
      const user = await userData;

      console.log("getUserData", user);
      // return only the data from the document
      const userDataArray = user.docs.map((doc) => doc.data());
      return userDataArray[0];
    } else {
      return { name: "Guest", email: "" };
    }
  } catch (error) {
    console.log(error);
  }
}
