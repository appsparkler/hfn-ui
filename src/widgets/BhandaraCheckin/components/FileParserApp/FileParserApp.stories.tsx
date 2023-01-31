/* eslint-disable */
import { CheckinTypesEnum } from "@hfn-checkins/types";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { doc, setDoc, writeBatch } from "firebase/firestore";
import { firestoreDb } from "widgets/BhandaraCheckin/firebase";
import { FirestoreCollections } from "widgets/BhandaraCheckin/types";
import { FileParserApp } from "./FileParserApp";

const Story = {
  component: FileParserApp,
  title: "Apps/FileParserApp",
} as ComponentMeta<typeof FileParserApp>;

const Template: ComponentStory<typeof FileParserApp> = (args) => {
  const SELECTED_SHEET = "Sorted";
  const batch = writeBatch(firestoreDb);
  const handleData = async (sheetName: string, data: Record<any, any>[]) => {
    if (sheetName === SELECTED_SHEET) {
      const first10Items = data.slice(0, 10);
      console.log(first10Items);
      // first10Items.forEach((eachItem) => {
      //   const uniqueId = eachItem.uniqueId;
      //   const docRef = doc(
      //     firestoreDb,
      //     FirestoreCollections.CHECKINS,
      //     uniqueId
      //   );
      //   batch.set(docRef, {
      //     ...eachItem,
      //     timestamp: Date.now(),
      //     type: "FileUpload",
      //   });
      // });
      // await batch.commit();
    }
  };
  args.onData = handleData;

  return <FileParserApp {...args} onData={handleData} />;
};

export const fileParserApp: ComponentStory<typeof FileParserApp> =
  Template.bind({});
fileParserApp.args = {};

export default Story;
