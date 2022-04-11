import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BhandaraCheckinAPIs, UserWithEmailAndMobile } from "../../types";
// import { RefinedCityStateCountryLocation } from "../../../../components/LocationTextField/locations";
import {
  isAbhyasiId,
  isAbhyasiIdTemp,
  isEmail,
  isMobile,
} from "../../../../utils";
import {
  CurrentSectionEnum,
  UserDetails,
  UserWithEmail,
  UserWithMobile,
} from "../../types";
import { RootDispatch, RootState } from "..";
import { snackbarSlice } from "../../../../components/Snackbar/snackbarSlice";

export type InitialState = {
  currentSection: CurrentSectionEnum;
  startCheckInError: boolean;
  registeringWithValue: string;
  isProcessing: boolean;
  helperText: string;
  userDetails: UserDetails;
  updateDetailsProcessing: boolean;
};

export const getInitialState = (): InitialState => {
  return {
    currentSection: CurrentSectionEnum.MAIN,
    //
    startCheckInError: false,
    registeringWithValue: "",
    isProcessing: false,
    helperText: "For mobile, please include country code.  For ex. + 913223...",
    userDetails: {
      fullName: {
        show: true,
        value: "",
      },
      mobile: {
        show: true,
        value: "",
      },
      email: {
        show: true,
        value: "",
      },
      location: {
        show: true,
      },
      ageGroup: {
        show: true,
        value: "",
      },
      gender: {
        show: true,
        value: "",
      },
    },
    updateDetailsProcessing: false,
  };
};

export const bhandaraCheckinSlice = createSlice({
  name: "bhandara-checkin",
  initialState: getInitialState(),
  reducers: {
    setState: (state, { payload }: { payload: Partial<InitialState> }) => {
      return {
        ...state,
        ...payload,
      };
    },
    setUpdateDetailsProcessing: (state, { payload }: { payload: boolean }) => {
      state.updateDetailsProcessing = payload;
    },
    goToUpdateDetails: (state) => {
      state.currentSection = CurrentSectionEnum.UPDATE_DETAILS;
    },
    goToMain: (state) => {
      state.currentSection = CurrentSectionEnum.MAIN;
    },
    goToCheckinSuccess: (state) => {
      state.currentSection = CurrentSectionEnum.CHECKIN_SUCCESS;
    },
    changeRegisteringWithValue: (state, { payload }) => {
      state.startCheckInError = false;
      state.registeringWithValue = payload;
    },
    setHelperText: (state, { payload }) => {
      state.helperText = payload;
    },
    setUserDetails: (state, { payload }) => {
      state.userDetails = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startCheckIn.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(startCheckIn.fulfilled, (state, action) => {
        state.isProcessing = false;
      })
      .addCase(checkinUser.pending, (state) => {
        state.updateDetailsProcessing = true;
      })
      .addCase(checkinUser.fulfilled, (state) => {
        state.updateDetailsProcessing = false;
      })
      .addMatcher(
        ({ type }: { type: string }) => Boolean(type.match("goToMain")),
        (state, action) => {
          return getInitialState();
        }
      );
  },
});

export type ThunkApiConfig = {
  getState: () => InitialState;
  dispatch: RootDispatch;
  extra: {
    apis: BhandaraCheckinAPIs;
  };
};

// Thunk Utils
// const getRefinedUserDetails = (user: User): UserDetails => {
//   const defaultUserDetails: UserDetails = getInitialState().userDetails;
//   return {
//     ...getInitialState().userDetails,
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
//           show: false,
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
//           value: String(
//             user.location
//           ) as unknown as RefinedCityStateCountryLocation,
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

const getUserDetailsWithEmailOrMobile = (userInfo: string): UserDetails => {
  const userDetails = getInitialState().userDetails;
  const loginWith: keyof UserDetails = isMobile(userInfo) ? "mobile" : "email";
  return {
    ...userDetails,
    [loginWith]: {
      ...userDetails[loginWith],
      value: userInfo,
      disabled: true,
      isValid: true,
    },
  };
};

const getUserForCheckin = (
  userDetails: UserDetails
): UserWithEmail | UserWithMobile | UserWithEmailAndMobile => {
  return {
    ageGroup: String(userDetails.ageGroup.value),
    email: String(userDetails.email.value),
    fullName: String(userDetails.fullName.value),
    gender: String(userDetails.gender.value),
    location: String(JSON.stringify(userDetails.location.value)),
    mobile: String(userDetails.mobile.value),
  };
};

// Async Thunks
export const startCheckinAbhyasiId = createAsyncThunk<
  void,
  undefined,
  ThunkApiConfig
>("bhandara-checkin/startCheckinAbhyasiId", (_, { dispatch, getState }) => {
  dispatch(
    bhandaraCheckinSlice.actions.setState({
      helperText: "Checkin with abhyasi-id is not yet implemented",
      startCheckInError: true,
    })
  );
});

export const startCheckIn = createAsyncThunk<void, undefined, ThunkApiConfig>(
  "bhandara-checkin/startCheckIn",
  async (_, { dispatch, getState, extra: { apis } }) => {
    const state = getState() as RootState;
    const { registeringWithValue } = state.bhandaraCheckin;
    if (
      isAbhyasiId(registeringWithValue) ||
      isAbhyasiIdTemp(registeringWithValue)
    )
      dispatch(startCheckinAbhyasiId());
    // await startCheckinAbhyasi(apis, registeringWithValue, dispatch);
    else {
      dispatch(
        bhandaraCheckinSlice.actions.setUserDetails(
          getUserDetailsWithEmailOrMobile(registeringWithValue)
        )
      );
      dispatch(bhandaraCheckinSlice.actions.goToUpdateDetails());
    }
  }
);

export const checkinUser = createAsyncThunk<void, undefined, ThunkApiConfig>(
  "bhandara-checkin/checkinUser",
  async (_, { dispatch, getState, extra: { apis } }) => {
    const state = getState() as RootState;
    const { registeringWithValue, userDetails } = state.bhandaraCheckin;
    const isRegisteringWithEmail = isEmail(registeringWithValue);
    const isEmailOrMobileUser =
      isRegisteringWithEmail || isMobile(registeringWithValue);
    if (isEmailOrMobileUser) {
      const isCheckedIn = await apis.isMobileOrEmailUserCheckedIn({
        fullName: userDetails.fullName.value as string,
        email: userDetails.email.value,
        mobile: userDetails.mobile.value,
      });
      if (isCheckedIn) {
        dispatch(
          snackbarSlice.actions.openSnackbar({
            children: "User is already checked in",
            severity: "warning",
            horizontal: "right",
            vertical: "top",
            variant: "standard",
            autoHideDuration: 5000,
          })
        );
      } else {
        const userForCheckin = getUserForCheckin(userDetails);
        const isCheckinDone = await apis.checkinMobileOrEmailUser(
          userForCheckin
        );
        if (isCheckinDone) {
          dispatch(bhandaraCheckinSlice.actions.goToCheckinSuccess());
        }
      }
    }
  }
);
