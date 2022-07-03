import { AnyAction, Dispatch } from "redux";
import { getMainSectionInitialState, mainSectionActions } from "../../slices";

export const handleChangeCheckinWithValue =
  (value: string) => (dispatch: Dispatch<AnyAction>) => {
    dispatch(
      mainSectionActions.setState({
        ...getMainSectionInitialState(),
        value,
      })
    );
  };
