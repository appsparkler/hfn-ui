import { ComponentMeta, ComponentStory } from "@storybook/react";
import { doc, setDoc } from "firebase/firestore";
import { firestoreDb } from "widgets/BhandaraCheckin/firebase";
import { FirestoreCollections } from "widgets/BhandaraCheckin/types";
import { FileParserApp } from "./FileParserApp";

const Story = {
  component: FileParserApp,
  title: "Apps/FileParserApp",
} as ComponentMeta<typeof FileParserApp>;

const Template: ComponentStory<typeof FileParserApp> = (args) => {
  const SELECTED_SHEET = "Sorted";
  const onData = (sheetName: string, data: Record<any, any>[]) => {
    if (sheetName === SELECTED_SHEET) {
      const first10Items = data.slice(0, 10);
      const docRef = doc(firestoreDb, FirestoreCollections.CHECKINS);
    }
  };
  args.onData = onData;

  return <FileParserApp {...args} />;
};

export const fileParserApp: ComponentStory<typeof FileParserApp> =
  Template.bind({});
fileParserApp.args = {};

export default Story;
