import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Dispatch,
} from "@reduxjs/toolkit";
import { BhandaraCheckinAPIs } from "../../types";
import { RefinedCityStateCountryLocation } from "../../../../components/LocationTextField/locations";
import { isAbhyasiId, isAbhyasiIdTemp, isMobile } from "../../../../utils";
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
  };
};

export const bhandaraCheckinSlice = createSlice({
  name: "bhandara-checkin",
  initialState: getInitialState(),
  reducers: {
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
    },
  };
};

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
