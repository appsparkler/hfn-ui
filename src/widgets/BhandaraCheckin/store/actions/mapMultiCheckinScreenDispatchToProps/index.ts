import { Dispatch } from "redux";
import { MapDispatchToProps } from "react-redux";
import {
  // IQRUserInfo,
  MultiCheckinScreenDispatchProps,
  // TCheckinTileInfo,
} from "widgets/BhandaraCheckin/types";
// import { map } from "lodash/fp";

// const mapCheckinTileInfoToUserData = map<TCheckinTileInfo, IQRUserInfo>(
//   (tileInfo) => {
//     return {
//       abhyasiId: tileInfo.id,
//       fullName: tileInfo.fullName,
//       regId: tileInfo.id,
//       birthPreference: tileInfo.birthPreference,
//       dormPrference: tileInfo.dormPreference,
//     };
//   }
// );

export const mapMultiCheckinScreenDispatchToProps: MapDispatchToProps<
  MultiCheckinScreenDispatchProps,
  {}
> = (dispatch: Dispatch) => ({
  onChangeData: (checkins) => {
    alert(JSON.stringify(checkins, null, 2));
    // dispatch<any>(multiCheckinScreenActions.setUserData());
  },
  onClickCancel: () => {},
  onClickCheckin: () => {},
});
