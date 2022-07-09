import { createAsyncThunk } from "@reduxjs/toolkit";
import { map } from "lodash/fp";
import { v4 as uuid } from "uuid";
import {
  AbhyasiCheckinData,
  CheckinEmailOrMobileUserDetails,
  OfflineCacheData,
  ThunkApiConfig,
} from "widgets/BhandaraCheckin/types";
import { OfflineDataItem } from "widgets/BhandaraCheckin/types/components/OfflineData";

export const getOfflineData = createAsyncThunk<any, undefined, ThunkApiConfig>(
  "api/checkinWithAbhyasiId",
  async (
    _,
    {
      extra: {
        apis: { getDataFromCache },
      },
      fulfillWithValue,
      rejectWithValue,
    }
  ) => {
    try {
      const cachedData = await getDataFromCache();
      if (cachedData !== false) {
        const getOfflineData = map<OfflineCacheData, OfflineDataItem>(
          (dataItem) => {
            if ((dataItem as AbhyasiCheckinData).abhyasiId) {
              const { abhyasiId } = dataItem as AbhyasiCheckinData;
              return {
                id: uuid(),
                info: abhyasiId,
              };
            }
            const {
              name,
              email = "",
              mobile = "",
            } = dataItem as CheckinEmailOrMobileUserDetails & {
              email: string;
              mobile: string;
            };
            const emailString = email ? `, ${email}` : "";
            const mobileString = mobile ? `, ${mobile}` : "";
            const info = `${name}${emailString}${mobileString}`;
            return {
              id: uuid(),
              info,
            };
          }
        );
        return fulfillWithValue(getOfflineData(cachedData));
      }
    } catch (error) {
      return rejectWithValue(false);
    }
  }
);
