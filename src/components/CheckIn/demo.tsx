import React, { useMemo, useState, useCallback } from "react";
import { CheckIn } from "./index";
import queryString from "query-string";
import { find, uniqueId, values, some } from "lodash/fp";
import {
  Favourite,
  GenericCheckInVerboseValue,
} from "../GenericCheckInVerbose";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { OptionValue } from "../SelectField";
import { RefinedCityStateCountryLocation } from "../CityStateCountryLocation/locations";
import { getDefaultUserInfo } from "../../utils";
// data
const favouritesData = [
  { abhyasiId: "INAAAE478", id: "1", name: "Prashant Mishra" },
  { abhyasiId: "INAAAE478", id: "2", name: "Nandini N" },
  { abhyasiId: "INAAAE478", id: "3", name: "Adithi Sharma" },
];

export const findWithId = <T extends { id: string }>(idToFind: string) =>
  find<T>((item) => item.id === idToFind);

const checkInFavourite =
  (favouriteUserId: string) =>
  (favourites: Favourite[]): Promise<string> =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = findWithId<Favourite>(favouriteUserId)(favourites);
        if (user) {
          if (favouriteUserId === "1")
            reject(new Error(`Couldn't login in ${user.name}`));
          else resolve(`${user.name} is logged in.`);
        }
      }, 600);
    });

const deleteFavourite =
  (favouriteUserId: string) =>
  (favourites: Favourite[]): Promise<string> =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = findWithId<Favourite>(favouriteUserId)(favourites);
        if (user) {
          if (favouriteUserId === "1")
            reject(new Error(`Couldn't delete ${user.name}`));
          else resolve(`${user.name} is deleted`);
        }
      }, 600);
    });

const checkinUser = (
  userInfo: string
): Promise<{
  successMessage: string;
  abhyasiId: string;
  id: string;
  name: string;
}> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userInfo.includes("@")) reject(new Error("No user exists"));
      else
        resolve({
          successMessage: "Nagarjuna is checked in",
          abhyasiId: "INAAAU489",
          id: uniqueId("fav-user"),
          name: "Nagarjuna Reddy",
        });
    }, 600);
  });

const checkInSignedInUser = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const okToSignIn = Math.floor(Math.random() * 2);
      if (okToSignIn) {
        resolve("You are checked in.");
      } else
        reject(
          new Error(
            "Couldn't check you in due to network issue.  Please try again later."
          )
        );
    }, 600);
  });

const someHaveError = some(({ error }) => Boolean(error));

const getFullNameError = (fullName: string) => {
  if (fullName.trim()) {
    return {
      error: false,
      helperText: "",
    };
  }
  return {
    error: true,
    helperText: "Name is required",
  };
};

const getEmailErrorInfo = (emailValue: string) => {
  if (emailValue.trim()) {
    return {
      error: false,
      helperText: "",
    };
  }
  return {
    error: true,
    helperText: "Email is required",
  };
};

const getAgeGroupErrorInfo = (ageGroupValue: OptionValue) => {
  if (ageGroupValue) {
    return {
      error: false,
      helperText: "",
    };
  } else {
    return {
      error: true,
      helperText: "Age is required",
    };
  }
};

const getGenderErrorInfo = (genderValue: OptionValue) => {
  if (genderValue) {
    return {
      error: false,
      helperText: "",
    };
  } else {
    return {
      error: true,
      helperText: "Please select a value.",
    };
  }
};

const getLocationErrorInfo = (
  locationValue: RefinedCityStateCountryLocation | undefined
) => {
  if (locationValue) {
    return {
      error: false,
      helperText: "",
    };
  } else {
    return {
      error: true,
      helperText: "Please enter location info.",
    };
  }
};

const validateUserInfo = (
  userInfo: GenericCheckInVerboseValue
): GenericCheckInVerboseValue => {
  const { fullName, ageGroup, gender, email, location } = userInfo;
  return {
    ...userInfo,
    fullName: {
      ...fullName,
      ...getFullNameError(fullName.value),
    },
    ageGroup: {
      ...ageGroup,
      ...getAgeGroupErrorInfo(ageGroup.value),
    },
    gender: {
      ...gender,
      ...getGenderErrorInfo(gender.value),
    },
    email: {
      ...email,
      ...getEmailErrorInfo(email.value),
    },
    location: {
      ...location,
      ...getLocationErrorInfo(location.value),
    },
  };
};

const checkinVerboseUser = (userInfo: GenericCheckInVerboseValue) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve(`${userInfo.fullName.value} is checked in`);
      reject(new Error("Server Error"));
    }, 600);
  });

export const CheckInDemo = () => {
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [favourites, setFavourites] = useState(favouritesData);
  const [unregisteredUserInfo, setUnregisteredUserInfo] =
    useState<GenericCheckInVerboseValue>(getDefaultUserInfo());
  const [isFormSubmittedOnce, setIsFormSubmittedOnce] = useState(false);

  const handleChangeVerboseUserInfo = useCallback(
    (userInfo) => {
      if (isFormSubmittedOnce) {
        const validatedUserInfo = validateUserInfo(userInfo);
        someHaveError(values(validatedUserInfo));
        setUnregisteredUserInfo(validatedUserInfo);
      } else {
        setUnregisteredUserInfo(userInfo);
      }
    },
    [isFormSubmittedOnce]
  );

  const handleCheckInVerboseUser = useCallback(async () => {
    if (!isFormSubmittedOnce) {
      setIsFormSubmittedOnce(true);
    }
    try {
      const validatedUserInfo = validateUserInfo(unregisteredUserInfo);
      const hasError = someHaveError(values(validatedUserInfo));
      if (!hasError) {
        const successMessage = await checkinVerboseUser(validatedUserInfo);
        setUnregisteredUserInfo(getDefaultUserInfo());
        setIsFormSubmittedOnce(false);
        return successMessage;
      }
    } catch (e: any) {
      throw new Error(e.message);
    }
  }, [isFormSubmittedOnce, unregisteredUserInfo]);

  const { eventName, eventLocation } = useMemo(() => {
    if (typeof window !== "undefined") {
      const { eventName = "", eventLocation = "" } = queryString.parse(
        window.location.search
      );
      return {
        eventName: eventName as string,
        eventLocation: eventLocation as string,
      };
    }
    return { eventName: "", eventLocation: "" };
  }, []);

  const handleCheckinFavourite = useCallback(
    async (favouriteUserId) => {
      return checkInFavourite(favouriteUserId)(favourites);
    },
    [favourites]
  );

  const handleDeleteFavourite = useCallback(
    async (favouriteUserId) => {
      try {
        const successMessage = await deleteFavourite(favouriteUserId)(
          favourites
        );
        setFavourites((prevData) => [
          ...prevData.filter((fav) => fav.id !== favouriteUserId),
        ]);
        return successMessage;
      } catch (e: any) {
        const err = e as Error;
        throw new Error(err.message);
      }
    },
    [favourites]
  );

  const handleClickCheckInUser = useCallback(
    async (userInfo, addToFavourite) => {
      try {
        const { successMessage, name, abhyasiId } = await checkinUser(userInfo);
        if (addToFavourite) {
          const favUserId = uniqueId("fav-user");
          setFavourites((prevData) => [
            ...prevData,
            {
              abhyasiId: abhyasiId,
              id: favUserId,
              name: name,
            },
          ]);
        }
        return successMessage;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    []
  );

  const handleSignedInUserCheckIn = useCallback(async () => {
    try {
      await checkInSignedInUser();
      setIsCheckedIn(true);
    } catch (error: any) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }, []);

  const handleChangeSignIn = useCallback(() => {
    setIsSignedIn((prev) => !prev);
  }, []);

  return (
    <>
      <Box
        sx={{
          width: ["100%", 350],
          outline: "1px  solid",
          outlineColor: "primary",
          margin: "auto",
          marginTop: [0, 2],
          paddingBottom: 2,
        }}
      >
        <CheckIn
          eventLocation={eventLocation}
          eventName={eventName}
          favourites={favourites}
          unRegisteredUserInfo={unregisteredUserInfo}
          isSignedIn={isSignedIn}
          isCheckedIn={isCheckedIn}
          onCheckInFavourite={handleCheckinFavourite}
          onDeleteFavourite={handleDeleteFavourite}
          onCheckInUser={handleClickCheckInUser}
          onClickCheckIn={handleSignedInUserCheckIn}
          onChangeVerboseUserInfo={handleChangeVerboseUserInfo}
          onCheckInVerboseUser={handleCheckInVerboseUser}
          onClickBackButton={() => console.log("hello")}
        />
      </Box>

      <Box
        sx={{
          width: ["100%", 350],
          outline: "1px  solid",
          outlineColor: "primary",
          margin: "auto",
          my: 2,
        }}
      >
        <FormControlLabel
          control={<Switch onChange={handleChangeSignIn} value={isSignedIn} />}
          label="Signed In Flow"
          sx={{ padding: 1 }}
        />
      </Box>
    </>
  );
};

export default CheckInDemo;
