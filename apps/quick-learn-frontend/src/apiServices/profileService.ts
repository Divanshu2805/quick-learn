import { userApiEnum } from '@src/constants/api.enum';
import axiosInstance from './axios';
import { AxiosSuccessResponse } from './axios';
import {
  TChangePasswordType,
  TChangePreferenceType,
  TUserProfileType,
} from '@src/shared/types/profileTypes';
import { removeEmptyValues } from '@src/utils/helpers';

export const getUserProfileService = async (): Promise<
  AxiosSuccessResponse<TUserProfileType>
> => {
  const response = await axiosInstance.get<
    AxiosSuccessResponse<TUserProfileType>
  >(userApiEnum.GET_USER_PROFILE);
  return response.data;
};

export const updateUserProfileService = async (
  data: Partial<TUserProfileType>,
): Promise<AxiosSuccessResponse> => {
  const response = await axiosInstance.post<AxiosSuccessResponse>(
    userApiEnum.GET_USER_PROFILE,
    removeEmptyValues(data),
  );
  return response.data;
};

export const changePasswordService = async (
  data: TChangePasswordType,
): Promise<AxiosSuccessResponse> => {
  const response = await axiosInstance.post<AxiosSuccessResponse>(
    userApiEnum.CHANGE_PASSWORD,
    data,
  );
  return response.data;
};

export const getUserPreferencesService =
  async (): Promise<AxiosSuccessResponse> => {
    const response = await axiosInstance.get<AxiosSuccessResponse>(
      userApiEnum.USER_PREFERENCES,
    );
    return response.data;
  };

export const updateUserPreferencesService = async (
  preference: boolean,
): Promise<AxiosSuccessResponse<TChangePreferenceType>> => {
  const response = await axiosInstance.patch<
    AxiosSuccessResponse<TChangePreferenceType>
  >(userApiEnum.USER_PREFERENCES, { preference });
  return response.data;
};