import { AnyAction, Dispatch } from "redux";
import { codeReader } from "widgets/BhandaraCheckin/constants";

export const onUnmount = (dispatch: Dispatch<AnyAction>) => {
  codeReader.reset();
};
