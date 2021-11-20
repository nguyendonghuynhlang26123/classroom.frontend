import { _request } from './utils';
import { GenericGetAllResponse, JoinClass } from 'common/interfaces';
// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../repository';

import type { Classroom, CreateClassroom } from 'common/interfaces';

// Define a service using a base URL and expected endpoints
export const CLASSROOM_API_REDUCER_KEY = 'classroomApi';
export const classroomApi = createApi({
  reducerPath: CLASSROOM_API_REDUCER_KEY,
  baseQuery: baseQuery,
  tagTypes: ['Classes'],
  endpoints: (builder) => ({
    getAllClasses: builder.query<Classroom[], void>({
      query: () => _request.get('classes'),
      transformResponse: (response: GenericGetAllResponse<Classroom>) => response.data,
      providesTags: (result: Classroom[] | undefined) =>
        // is result available?
        result
          ? // successful query
            [...result.map(({ _id }) => ({ type: 'Classes', id: _id } as const)), { type: 'Classes', id: 'LIST' }]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Classes', id: 'LIST' }],
      // highlight-end
    }),

    createClass: builder.mutation<Classroom, CreateClassroom>({
      query: (body) => _request.post('classes', body),
      invalidatesTags: [{ type: 'Classes', id: 'LIST' }],
    }),

    joinClass: builder.mutation<any, JoinClass>({
      query: (body) => _request.post('classes/join', body),
      invalidatesTags: [{ type: 'Classes', id: 'LIST' }],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetAllClassesQuery, useCreateClassMutation, useJoinClassMutation } = classroomApi;
