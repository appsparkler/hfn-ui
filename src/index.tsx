import { render } from "react-dom";
import { BhandaraCheckinWidgetDemo } from "./widgets/BhandaraCheckin";
import { initFirebase } from "widgets/BhandaraCheckin/firebase";
import { ENVS } from "widgets/BhandaraCheckin/types";

initFirebase(process.env.ENV as ENVS);

const root = document.getElementById("root");

render(<BhandaraCheckinWidgetDemo />, root);
