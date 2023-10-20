import * as admin from "firebase-admin/app";
import * as firestore from "firebase-admin/firestore";
import adminCreds from "./hfn-checkins-firebase-adminsdk-uod1b-375d663d8e.json";

const { initializeApp, applicationDefault, cert } = admin;

const { getFirestore } = firestore;

admin.initializeApp({
  credential: cert(adminCreds as admin.ServiceAccount),
});

const db = getFirestore();

const collection = db.collection("/events/202307_july_bhandara/checkins");

const docRef = collection.doc("633d53fe-443d-4ff4-b3b0-7bd13dabf303");

docRef.get().then((doc) => {
  if (doc.exists) {
    console.log("Document data:", doc.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
});
