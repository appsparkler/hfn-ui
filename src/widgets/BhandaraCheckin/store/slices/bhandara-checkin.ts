import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Dispatch,
} from "@reduxjs/toolkit";
import { BhandaraCheckinAPIs, UserWithEmailAndMobile } from "../../types";
import { RefinedCityStateCountryLocation } from "../../../../components/LocationTextField/locations";
import {
  isAbhyasiId,
  isAbhyasiIdTemp,
  isEmail,
  isMobile,
} from "../../../../utils";
import {
  CurrentSectionEnum,
  User,
  UserDetails,
  UserWithEmail,
  UserWithMobile,
} from "../../types";

export type InitialState = {
  currentSection: CurrentSectionEnum;
  registeringWithValue: string;
  isProcessing: boolean;
  helperText: string;
  userDetails: UserDetails;
  updateDetailsWarning: string;
};

export const getInitialState = (): InitialState => {
  return {
    currentSection: CurrentSectionEnum.MAIN,
    registeringWithValue: "+916438010246",
    isProcessing: false,
    helperText: "",
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
    updateDetailsWarning: "",
  };
};

export const bhandaraCheckinSlice = createSlice({
  name: "bhandara-checkin",
  initialState: getInitialState(),
  reducers: {
    setUpdateDetailsWarning: (state, { payload }: { payload: string }) => {
      state.updateDetailsWarning = payload;
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
    builder.addCase(startCheckIn.pending, (state) => {
      state.isProcessing = true;
    });
    builder.addCase(startCheckIn.fulfilled, (state, action) => {
      state.isProcessing = false;
    });
  },
});

export type ThunkApiConfig = {
  extra: {
    apis: BhandaraCheckinAPIs;
  };
};

// Thunk Utils
const getRefinedUserDetails = (user: User): UserDetails => {
  const defaultUserDetails: UserDetails = getInitialState().userDetails;
  return {
    ...getInitialState().userDetails,
    email: (user as UserWithEmail).email
      ? {
          isValid: true,
          show: false,
          value: String((user as UserWithEmail).email),
        }
      : defaultUserDetails.email,
    mobile: (user as UserWithMobile).mobile
      ? {
          isValid: true,
          show: false,
          value: String((user as UserWithMobile).mobile),
        }
      : defaultUserDetails.mobile,
    ageGroup: user.ageGroup
      ? {
          isValid: true,
          show: false,
          value: String(user.ageGroup),
        }
      : defaultUserDetails.ageGroup,
    fullName: user.fullName
      ? {
          isValid: true,
          show: false,
          value: String(user.fullName),
        }
      : defaultUserDetails.fullName,
    gender: user.gender
      ? {
          isValid: true,
          show: false,
          value: String(user.gender),
        }
      : defaultUserDetails.gender,
    location: user.location
      ? {
          isValid: true,
          show: false,
          value: String(
            user.location
          ) as unknown as RefinedCityStateCountryLocation,
        }
      : defaultUserDetails.location,
  };
};

const startCheckinAbhyasi = async (
  apis: BhandaraCheckinAPIs,
  userId: string,
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  const isAbhyasiCheckedIn = await apis.getIsUserCheckedIn(userId);
  if (isAbhyasiCheckedIn) {
    dispatch(
      bhandaraCheckinSlice.actions.setHelperText(
        `Abhyasi with id ${userId} is already checked in.`
      )
    );
  } else {
    const user = await apis.getUserDetails(userId);
    const refinedUserDetails = getRefinedUserDetails(user);
    dispatch(bhandaraCheckinSlice.actions.setUserDetails(refinedUserDetails));
    dispatch(bhandaraCheckinSlice.actions.goToUpdateDetails());
  }
};

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
export const startCheckIn = createAsyncThunk<void, string, ThunkApiConfig>(
  "bhandara-checkin/startCheckIn",
  async (userId, { dispatch, extra: { apis } }) => {
    if (isAbhyasiId(userId) || isAbhyasiIdTemp(userId))
      await startCheckinAbhyasi(apis, userId, dispatch);
    else {
      dispatch(
        bhandaraCheckinSlice.actions.setUserDetails(
          getUserDetailsWithEmailOrMobile(userId)
        )
      );
      dispatch(bhandaraCheckinSlice.actions.goToUpdateDetails());
    }
  }
);

export const checkinUser = createAsyncThunk<void, undefined, ThunkApiConfig>(
  "bhandara-checkin/checkinUser",
  async (_, { dispatch, getState, extra: { apis } }) => {
    const { registeringWithValue, userDetails } = getState() as InitialState;
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
          bhandaraCheckinSlice.actions.setUpdateDetailsWarning(
            "User is already checked in"
          )
        );
      }
    } else {
      const userForCheckin = getUserForCheckin(userDetails);
      const isCheckinDone = await apis.checkinMobileOrEmailUser(userForCheckin);
      if (isCheckinDone) {
        bhandaraCheckinSlice.actions.goToCheckinSuccess();
      }
    }
  }
);
