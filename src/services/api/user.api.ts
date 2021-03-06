import { IChangePassBody } from './../../common/interfaces/users/changePass.interface';
import { _request } from './utils';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../repository';

import type { IUser, IUserBody } from 'common/interfaces';

// Define a service using a base URL and expected endpoints
export const USERS_API_REDUCER_KEY = 'usersApi';
export const USERS_TAG = 'Users';
export const usersApi = createApi({
  reducerPath: USERS_API_REDUCER_KEY,
  baseQuery: baseQuery,
  tagTypes: [USERS_TAG],
  endpoints: (builder) => ({
    getUserData: builder.query<IUser, string>({
      query: (id: string) => _request.get(`users/${id}`),
      providesTags: [{ type: USERS_TAG, id: 'DATA' }],
    }),
    updateProfile: builder.mutation<IUser, { id: string; body: IUserBody }>({
      query: ({ id, body }) => _request.put(`users/${id}`, body),
      invalidatesTags: [{ type: USERS_TAG, id: 'DATA' }],
    }),
    activateAccount: builder.mutation<IUser, { id: string; code: string }>({
      query: ({ id, code }) => _request.post(`users/${id}/activate`, { activate_code: code }),
    }),
    changePass: builder.mutation<IUser, { id: string; body: IChangePassBody }>({
      query: ({ id, body }) => _request.put(`users/${id}/changePass`, body),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetUserDataQuery, useUpdateProfileMutation, useActivateAccountMutation, useChangePassMutation } = usersApi;
