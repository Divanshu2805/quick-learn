import {
  TContentRepositoryMetadata,
  TCourse,
  TCreateCourse,
  TCreateRoadmap,
  TRoadmap,
} from '@src/shared/types/contentRepository';
import axiosInstance, { AxiosSuccessResponse } from './axios';
import { ContentRepositoryApiEnum } from '@src/constants/api.enum';

export const getContentRepositoryMetadata = async (): Promise<
  AxiosSuccessResponse<TContentRepositoryMetadata>
> => {
  const response = await axiosInstance.get<
    AxiosSuccessResponse<TContentRepositoryMetadata>
  >(ContentRepositoryApiEnum.METADATA);
  return response.data;
};

export const getRoadmaps = async (): Promise<
  AxiosSuccessResponse<TRoadmap[]>
> => {
  const response = await axiosInstance.get<AxiosSuccessResponse<TRoadmap[]>>(
    ContentRepositoryApiEnum.ROADMAP,
  );
  return response.data;
};

export const getRoadmap = async (
  id: string,
): Promise<AxiosSuccessResponse<TRoadmap>> => {
  const response = await axiosInstance.get<AxiosSuccessResponse<TRoadmap>>(
    ContentRepositoryApiEnum.ROADMAP + `/${id}`,
  );
  return response.data;
};

export const createRoadmap = async (
  data: TCreateRoadmap,
): Promise<AxiosSuccessResponse<TRoadmap>> => {
  const response = await axiosInstance.post<AxiosSuccessResponse<TRoadmap>>(
    ContentRepositoryApiEnum.ROADMAP,
    data,
  );
  return response.data;
};

export const updateRoadmap = async (
  id: string,
  data: TCreateRoadmap,
): Promise<AxiosSuccessResponse> => {
  const response = await axiosInstance.patch<AxiosSuccessResponse>(
    ContentRepositoryApiEnum.ROADMAP + `/${id}`,
    data,
  );
  return response.data;
};

export const createCourse = async (
  data: TCreateCourse & { roadmap_id: number },
): Promise<AxiosSuccessResponse<TCourse>> => {
  const response = await axiosInstance.post<AxiosSuccessResponse<TCourse>>(
    ContentRepositoryApiEnum.COURSE,
    data,
  );
  return response.data;
};

export const getCourse = async (
  id: string,
): Promise<AxiosSuccessResponse<TCourse>> => {
  const response = await axiosInstance.get<AxiosSuccessResponse<TCourse>>(
    ContentRepositoryApiEnum.COURSE + `/${id}`,
  );
  return response.data;
};

export const updateCourse = async (
  id: string,
  data: TCreateCourse,
): Promise<AxiosSuccessResponse> => {
  const response = await axiosInstance.patch<AxiosSuccessResponse>(
    ContentRepositoryApiEnum.COURSE + `/${id}`,
    data,
  );
  return response.data;
};

export const assignCoursesToRoadmap = async (
  id: string,
  data: string[],
): Promise<AxiosSuccessResponse> => {
  const response = await axiosInstance.patch<AxiosSuccessResponse>(
    ContentRepositoryApiEnum.ROADMAP + `/${id}/assign`,
    {
      courses: data,
    },
  );
  return response.data;
};

export const assignRoadmapsToCourse = async (
  id: string,
  data: string[],
): Promise<AxiosSuccessResponse> => {
  const response = await axiosInstance.patch<AxiosSuccessResponse>(
    ContentRepositoryApiEnum.COURSE + `/${id}/assign`,
    {
      roadmaps: data,
    },
  );
  return response.data;
};

export const archiveRoadmap = async (
  id: string,
): Promise<AxiosSuccessResponse> => {
  const response = await axiosInstance.delete<AxiosSuccessResponse>(
    ContentRepositoryApiEnum.ROADMAP + `/${id}`,
  );
  return response.data;
};

export const archiveCourse = async (
  id: string,
): Promise<AxiosSuccessResponse> => {
  const response = await axiosInstance.delete<AxiosSuccessResponse>(
    ContentRepositoryApiEnum.COURSE + `/${id}`,
  );
  return response.data;
};