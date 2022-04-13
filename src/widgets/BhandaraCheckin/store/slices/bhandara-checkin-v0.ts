import { createSlice } from "@reduxjs/toolkit";
// import { User, UserWithEmailAndMobile } from "../../types";

import // isAbhyasiId,
// isAbhyasiIdTemp,
// isEmail,
// isMobile,
"../../../../utils";
import {
  CurrentSectionEnum,
  // UserDetails,
  // UserWithEmail,
  // UserWithMobile,
} from "../../types";
// import { RootState, ThunkApiConfig } from "..";
// import { snackbarSlice } from "../../../../components/Snackbar/snackbarSlice";
// import { mainSectionSlice } from "./mainSectionSlice";
import { BhandaraCheckinViewStateProps } from "../../BhandaraCheckinView";
import {
  getUpdateDetailsSectionInitialState,
  // updateDetailsSectionSlice,
} from "./updateDetailsSectionSlice";

// export type BhandaraCheckinState = {
//   currentSection: CurrentSectionEnum;
//   mainSection: SectionMainStateProps;
//   updateDetailsSection: SectionUpdateDetailsStateProps;
//   startCheckInError: boolean;
//   startCheckinIsProcessing: boolean;
//   registeringWithValue: string;
//   isProcessing: boolean;
//   helperText: string;
//   userDetails: UserDetails;
//   updateDetailsProcessing: boolean;
// };

export const getBhandaraCheckinInitialState =
  (): BhandaraCheckinViewStateProps => {
    return {
      currentSection: CurrentSectionEnum.MAIN,
      // mainSection: {
      //   value: "",
      //   error: false,
      //   helperText:
      //     "For mobile, please include country code.  For ex. + 913223...",
      //   isProcessing: false,
      // },
      // updateDetailsSection: {
      //   userDetails: {
      //     fullName: {
      //       show: true,
      //       value: "",
      //     },
      //     mobile: {
      //       show: true,
      //       value: "",
      //     },
      //     email: {
      //       show: true,
      //       value: "",
      //     },
      //     location: {
      //       show: true,
      //     },
      //     ageGroup: {
      //       show: true,
      //       value: "",
      //     },
      //     gender: {
      //       show: true,
      //       value: "",
      //     },
      //   },
      // },
      // //
      // startCheckInError: false,
      // startCheckinIsProcessing: false,
      // registeringWithValue: "",
      // isProcessing: false,
      // helperText: "For mobile, please include country code.  For ex. + 913223...",
      // userDetails: {
      //   fullName: {
      //     show: true,
      //     value: "",
      //   },
      //   mobile: {
      //     show: true,
      //     value: "",
      //   },
      //   email: {
      //     show: true,
      //     value: "",
      //   },
      //   location: {
      //     show: true,
      //   },
      //   ageGroup: {
      //     show: true,
      //     value: "",
      //   },
      //   gender: {
      //     show: true,
      //     value: "",
      //   },
      // },
      // updateDetailsProcessing: false,
    };
  };

export const bhandaraCheckinSlice = createSlice({
  name: "bhandara-checkin",
  initialState: getBhandaraCheckinInitialState(),
  reducers: {
    goToMain: (state) => {
      state.currentSection = CurrentSectionEnum.MAIN;
    },
    goToUpdateDetails: (state) => {
      state.currentSection = CurrentSectionEnum.UPDATE_DETAILS;
    },
    goToCheckinSuccess: (state) => {
      state.currentSection = CurrentSectionEnum.CHECKIN_SUCCESS;
    },
    // setMainSectionState: (
    //   state,
    //   { payload }: { payload: Partial<SectionMainStateProps> }
    // ) => ({
    //   ...state,
    //   mainSection: {
    //     ...state.mainSection,
    //     ...payload,
    //   },
    // }),
    // setUpdateSectionState: (
    //   state,
    //   { payload }: { payload: Partial<SectionUpdateDetailsStateProps> }
    // ) => ({
    //   ...state,
    //   updateDetailsSection: {
    //     ...state.updateDetailsSection,
    //     ...payload,
    //   },
    // }),
    // setState: (
    //   state,
    //   { payload }: { payload: Partial<BhandaraCheckinState> }
    // ) => {
    //   return {
    //     ...state,
    //     ...payload,
    //   };
    // },

    // setUpdateDetailsProcessing: (state, { payload }: { payload: boolean }) => {
    //   state.updateDetailsProcessing = payload;
    // },
    // goToUpdateDetails: (state) => {
    //   state.currentSection = CurrentSectionEnum.UPDATE_DETAILS;
    // },
    // goToMain: (state) => {
    //   state.currentSection = CurrentSectionEnum.MAIN;
    // },
    // goToCheckinSuccess: (state) => {
    //   state.currentSection = CurrentSectionEnum.CHECKIN_SUCCESS;
    // },
    // changeRegisteringWithValue: (state, { payload }) => {
    //   state.startCheckInError = false;
    //   state.helperText = getInitialState().helperText;
    //   state.registeringWithValue = payload;
    // },
    // setHelperText: (state, { payload }) => {
    //   state.helperText = payload;
    // },
    // setUserDetails: (state, { payload }: { payload: UserDetails }) => {
    //   state.userDetails = payload;
    // },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(startCheckIn.pending, (state) => {
  //       state.isProcessing = true;
  //     })
  //     .addCase(startCheckIn.fulfilled, (state, action) => {
  //       state.isProcessing = false;
  //     })
  //     .addCase(checkinUser.pending, (state) => {
  //       state.updateDetailsProcessing = true;
  //     })
  //     .addCase(checkinUser.fulfilled, (state) => {
  //       state.updateDetailsProcessing = false;
  //     })
  //     .addMatcher(
  //       ({ type }: { type: string }) => Boolean(type.match("goToMain")),
  //       (state, action) => {
  //         return getInitialState();
  //       }
  //     );
  // },
});

// export type ThunkApiConfig = {
//   getState: () => RootState;
//   dispatch: RootDispatch;
//   extra: {
//     apis: BhandaraCheckinAPIs;
//   };
// };

// Thunk Utils

// const getRefinedUserDetails = (user: User): UserDetails => {
//   const defaultUserDetails: UserDetails =
//     getUpdateDetailsSectionInitialState().userDetails;
//   return {
//     ...defaultUserDetails,
//     email: (user as UserWithEmail).email
//       ? {
//           isValid: true,
//           show: false,
//           value: String((user as UserWithEmail).email),
//         }
//       : defaultUserDetails.email,
//     mobile: (user as UserWithMobile).mobile
//       ? {
//           isValid: true,
//           show: false,
//           value: String((user as UserWithMobile).mobile),
//         }
//       : defaultUserDetails.mobile,
//     ageGroup: user.ageGroup
//       ? {
//           isValid: true,
//           show: false,
//           value: String(user.ageGroup),
//         }
//       : defaultUserDetails.ageGroup,
//     fullName: user.fullName
//       ? {
//           isValid: true,
//           show: true,
//           disabled: true,
//           value: String(user.fullName),
//         }
//       : defaultUserDetails.fullName,
//     gender: user.gender
//       ? {
//           isValid: true,
//           show: false,
//           value: String(user.gender),
//         }
//       : defaultUserDetails.gender,
//     location: user.location
//       ? {
//           isValid: true,
//           show: false,
//           value: String(user.location) as unknown as any,
//         }
//       : defaultUserDetails.location,
//   };
// };

// const startCheckinAbhyasiV0 = async (
//   apis: BhandaraCheckinAPIs,
//   userId: string,
//   dispatch: Dispatch<AnyAction>
// ): Promise<void> => {
//   const isAbhyasiCheckedIn = await apis.getIsUserCheckedIn(userId);
//   if (isAbhyasiCheckedIn) {
//     dispatch(
//       bhandaraCheckinSlice.actions.setHelperText(
//         `Abhyasi with id ${userId} is already checked in.`
//       )
//     );
//   } else {
//     const user = await apis.getUserDetails(userId);
//     const refinedUserDetails = getRefinedUserDetails(user);
//     dispatch(bhandaraCheckinSlice.actions.setUserDetails(refinedUserDetails));
//     dispatch(bhandaraCheckinSlice.actions.goToUpdateDetails());
//   }
// };

// const getUserDetailsWithEmailOrMobile = (userInfo: string): UserDetails => {
//   const userDetails = getUpdateDetailsSectionInitialState().userDetails;
//   const loginWith: keyof UserDetails = isMobile(userInfo) ? "mobile" : "email";
//   return {
//     ...userDetails,
//     [loginWith]: {
//       ...userDetails[loginWith],
//       value: userInfo,
//       disabled: true,
//       isValid: true,
//     },
//   };
// };

// const getUserForCheckin = (
//   userDetails: UserDetails
// ): UserWithEmail | UserWithMobile | UserWithEmailAndMobile => {
//   return {
//     ageGroup: String(userDetails.ageGroup.value),
//     email: String(userDetails.email.value),
//     fullName: String(userDetails.fullName.value),
//     gender: String(userDetails.gender.value),
//     location: String(JSON.stringify(userDetails.location.value)),
//     mobile: String(userDetails.mobile.value),
//   };
// };

// Async Thunks
// const validateAbhyasi = createAsyncThunk<void, string, ThunkApiConfig>(
//   "bhandara-checkin/validateAbhyasi",
//   async (
//     abhyasiId,
//     {
//       dispatch,
//       rejectWithValue,
//       extra: {
//         apis: { getAbhyasiData },
//       },
//     }
//   ) => {
//     try {
//       const userDetails = await getAbhyasiData(abhyasiId);
//       const refinedUserDetails = getRefinedUserDetails(userDetails);
//       dispatch(
//         updateDetailsSectionSlice.actions.setState({
//           userDetails: {
//             ...getUpdateDetailsSectionInitialState().userDetails,
//             ...refinedUserDetails,
//           },
//         })
//       );
//       dispatch(bhandaraCheckinSlice.actions.goToUpdateDetails());
//     } catch (e) {
//       return rejectWithValue((e as Error).message);
//     }
//   }
// );

// export const startCheckinWithAbhyasiId = createAsyncThunk<
//   void,
//   undefined,
//   ThunkApiConfig
// >(
//   "bhandara-checkin/startCheckinWithAbhyasiId",
//   async (_, { dispatch, getState, extra: { apis } }) => {
//     const state = getState() as RootState;
//     const { value } = state.mainSection;
//     dispatch(
//       mainSectionSlice.actions.setState({
//         isProcessing: true,
//       })
//     );
//     const isAbhyasiCheckedIn = await apis.isAbhyasiCheckedIn(value);
//     if (isAbhyasiCheckedIn) {
//       dispatch(
//         mainSectionSlice.actions.setState({
//           helperText: `Abhyasi with ID ${value} is already checked in.`,
//           error: true,
//           isProcessing: false,
//         })
//       );
//     } else {
//       const res = await dispatch(validateAbhyasi(value));
//       if (
//         typeof res.payload === "string" &&
//         res.payload.includes("not found")
//       ) {
//         dispatch(
//           mainSectionSlice.actions.setState({
//             error: true,
//             isProcessing: false,
//             helperText: res.payload,
//           })
//         );
//       }
//     }
//   }
// );

// export const startCheckIn = createAsyncThunk<void, undefined, ThunkApiConfig>(
//   "bhandara-checkin/startCheckIn",
//   async (_, { dispatch, getState, extra: { apis } }) => {
//     const state = getState() as RootState;
//     const { value } = state.mainSection;
//     if (isAbhyasiId(value) || isAbhyasiIdTemp(value))
//       dispatch(startCheckinWithAbhyasiId());
//     else {
//       dispatch(
//         updateDetailsSectionSlice.actions.setState({
//           userDetails: getUserDetailsWithEmailOrMobile(value),
//         })
//       );
//       dispatch(bhandaraCheckinSlice.actions.goToUpdateDetails());
//     }
//   }
// );

// export const checkinUser = createAsyncThunk<void, undefined, ThunkApiConfig>(
//   "bhandara-checkin/checkinUser",
//   async (_, { dispatch, getState, extra: { apis } }) => {
//     const state = getState() as RootState;
//     const { value } = state.mainSection;
//     const { userDetails } = state.updateDetailsSection;
//     const isRegisteringWithEmail = isEmail(value);
//     const isEmailOrMobileUser = isRegisteringWithEmail || isMobile(value);
//     if (isEmailOrMobileUser) {
//       const isCheckedIn = await apis.isMobileOrEmailUserCheckedIn({
//         fullName: userDetails.fullName.value as string,
//         email: userDetails.email.value,
//         mobile: userDetails.mobile.value,
//       });
//       if (isCheckedIn) {
//         dispatch(
//           snackbarSlice.actions.openSnackbar({
//             children: "User is already checked in",
//             severity: "warning",
//             horizontal: "right",
//             vertical: "top",
//             variant: "filled",
//             autoHideDuration: 5000,
//           })
//         );
//       } else {
//         const userForCheckin = getUserForCheckin(userDetails);
//         const isCheckinDone = await apis.checkinMobileOrEmailUser(
//           userForCheckin
//         );
//         if (isCheckinDone) {
//           dispatch(bhandaraCheckinSlice.actions.goToCheckinSuccess());
//         }
//       }
//     }
//   }
// );
