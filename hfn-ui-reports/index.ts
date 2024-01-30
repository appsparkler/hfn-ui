// import * as admin from "firebase-admin/app";
// import * as firestore from "firebase-admin/firestore";
// import adminCreds from "./hfn-checkins-firebase-adminsdk-uod1b-375d663d8e.json";
import * as xlsx from "xlsx";
import * as fs from "fs";

// xlsx.set_fs(fs);
// const { cert } = admin;

// const { getFirestore } = firestore;

// admin.initializeApp({
//   credential: cert(adminCreds as admin.ServiceAccount),
// });

// const createJsonFile = (fileName: string, data: any[]) => {
//   fs.writeFileSync(fileName, JSON.stringify(data), "utf-8");
//   console.log(`${data.length} docs written to JSON file ${fileName}`);
// };

const createXLSXFile = (fileName: string, data: any[]) => {
  const workSheet = xlsx.utils.json_to_sheet(data);
  const workBook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workBook, workSheet, "Sheet1");
  xlsx.writeFile(workBook, fileName);
};

// const db = getFirestore();

// const getData = async (collectionPath: string) => {
//   const collection = db.collection(collectionPath);
//   const docRef = collection.where("type", "==", "EmailOrMobile");
//   const snapshot = await docRef.get();
//   if (snapshot.empty) {
//     console.log("no matching docs");
//     return;
//   }
//   const data: any[] = [];
//   snapshot.forEach((doc) => {
//     data.push(doc.data());
//   });
//   return data;
// };

const init = () => {
  createXLSXFromJSON("./data.json", "./data.xlsx");
  // const data = await getData("/events/202307_july_bhandara/checkins");
  // if (data) {
  //   createJsonFile("./data.json", data);
  //   createXLSXFile("./data.xlsx", data);
  // }
};

const createXLSXFromJSON = (jsonFileName: string, xlsxFileName: string) => {
  const buffer = fs.readFileSync(jsonFileName);
  const data = JSON.parse(buffer.toString());
  console.log(data.length);
  createXLSXFile(xlsxFileName, data);
};

init();
