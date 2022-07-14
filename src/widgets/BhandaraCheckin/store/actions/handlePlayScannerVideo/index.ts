import { AnyAction, Dispatch } from "redux";
import { mainSectionActions } from "../../slices";

export const handlePlayScannerVideo = () => (dispatch: Dispatch<AnyAction>) => {
  dispatch(mainSectionActions.stopProcessingScanButton());
};
