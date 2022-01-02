import { _request } from './utils';
import { IGenericGetAllResponse, IActivity } from 'common/interfaces';
// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../repository';

// Define a service using a base URL and expected endpoints
export const STREAM_API_REDUCER_KEY = 'streamApi';
export const STREAM_TAG = 'ActivityStreams';
export const streamApi = createApi({
  reducerPath: STREAM_API_REDUCER_KEY,
  baseQuery: baseQuery,
  tagTypes: [STREAM_TAG],
  endpoints: (builder) => ({
    getAllActivities: builder.query<IActivity[], string>({
      query: (id) => _request.get(`classes/${id}/stream?sort_by=created_at&sort_type=desc&per_page=100`),
      transformResponse: (response: IGenericGetAllResponse<IActivity>) => response.data,
      providesTags: () => [{ type: STREAM_TAG, id: 'LIST' }],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetAllActivitiesQuery } = streamApi;
