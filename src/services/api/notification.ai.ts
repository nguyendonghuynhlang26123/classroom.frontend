import { _request } from './utils';
import { IGenericGetAllResponse, INotification } from 'common/interfaces';
// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../repository';

// Define a service using a base URL and expected endpoints
export const NOTIFICATION_API_REDUCER_KEY = 'notificationApi';
export const NOTIFICATION_TAG = 'Notifications';
export const notificationApi = createApi({
  reducerPath: NOTIFICATION_API_REDUCER_KEY,
  baseQuery: baseQuery,
  tagTypes: [NOTIFICATION_TAG],
  endpoints: (builder) => ({
    getAllNotification: builder.query<INotification[], void>({
      query: () => _request.get(`notifications/my-notification?sort_by=created_at&sort_type=desc`),
      transformResponse: (response: IGenericGetAllResponse<INotification>) => response.data,
      providesTags: () => [{ type: NOTIFICATION_TAG }],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetAllNotificationQuery } = notificationApi;
