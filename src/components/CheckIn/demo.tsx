import React, { useMemo, useState, useCallback } from "react";
import { CheckIn } from "./index";
import queryString from "query-string";
import { find, uniqueId, values, some } from "lodash/fp";
import {
  Favourite,
  GenericCheckInVerboseProps,
  GenericCheckInVerboseValue,
} from "../GenericCheckInVerbose";
// data
const favouritesData = [
  { abhyasiId: "INAAAE478", id: "1", name: "Prashant Mishra" },
  { abhyasiId: "INAAAE478", id: "2", name: "Nandini N" },
  { abhyasiId: "INAAAE478", id: "3", name: "Adithi Sharma" },
];

export const findWithId = <T extends { id: string }>(idToFind: string) =>
  find<T>((item) => item.id === idToFind);

const checkInFavourite =
  (favouriteUserId: string) => (favourites: Favourite[]) =>
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
  (favouriteUserId: string) => (favourites: Favourite[]) =>
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

const checkinUser = (userInfo: string) =>
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

const getDefaultUserInfo = () => ({
  ageGroup: { value: "", error: false, helperText: "" },
  email: { value: "", error: false, helperText: "" },
  fullName: { value: "", error: false, helperText: "" },
  gender: { value: "", error: false, helperText: "" },
  location: { value: undefined, error: false, helperText: "" },
});

const getFullNameError = (fullName) => {
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

const validateUserInfo = (userInfo) => {
  const { fullName } = userInfo;
  return {
    ...userInfo,
    fullName: {
      ...fullName,
      ...getFullNameError(fullName.value),
    },
  };
};

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [favourites, setFavourites] = useState(favouritesData);
  const [unregisteredUserInfo, setUnregisteredUserInfo] = useState(
    getDefaultUserInfo()
  );
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

  const handleCheckInVerboseUser = useCallback(() => {
    setIsFormSubmittedOnce(true);
    // if (!isFormSubmittedOnce) {
    // }
  }, []);

  const { eventName, eventLocation } = useMemo(() => {
    if (typeof window !== "undefined")
      return queryString.parse(window.location.search);
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
      } catch (e) {
        throw new Error(e.message);
      }
    },
    [favourites]
  );

  const handleClickCheckInUser = useCallback(
    async (userInfo, addToFavourite) => {
      try {
        const checkedInUser = await checkinUser(userInfo);
        if (addToFavourite) {
          setFavourites((prevData) => [
            ...prevData,
            {
              abhyasiId: checkedInUser.abhyasiId,
              id: uniqueId("fav-user"),
              name: checkedInUser.name,
            },
          ]);
        }

        return checkedInUser.successMessage;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    []
  );

  const handleSignedInUserCheckIn = useCallback(async () => {
    try {
      await checkInSignedInUser();
    } catch (error) {
      throw new Error(error.message);
    }
  }, []);

  const handleChangeSignIn = useCallback(() => {
    setIsSignedIn((prev) => !prev);
  }, []);

  return (
    <>
      <Box sx={{ position: "fixed", bottom: 15, right: 15 }}>
        <Switch
          label="Signed In"
          value={isSignedIn}
          onChange={handleChangeSignIn}
        />
      </Box>
      <CheckIn
        eventLocation={eventLocation}
        eventName={eventName}
        favourites={favourites}
        unRegisteredUserInfo={unregisteredUserInfo}
        isSignedIn={isSignedIn}
        onCheckInFavourite={handleCheckinFavourite}
        onDeleteFavourite={handleDeleteFavourite}
        onCheckInUser={handleClickCheckInUser}
        onClickCheckIn={handleSignedInUserCheckIn}
        onChangeVerboseUserInfo={handleChangeVerboseUserInfo}
        onCheckInVerboseUser={handleCheckInVerboseUser}
        onClickBackButton={() => console.log("hello")}
      />
    </>
  );
};
