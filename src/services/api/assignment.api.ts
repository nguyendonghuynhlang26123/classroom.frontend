import { _request } from './utils';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../repository';

import type { IAssignment, IAssignmentBody, IGenericGetAllResponse } from 'common/interfaces';

// Define a service using a base URL and expected endpoints
export const API_REDUCER_KEY = 'assignmentApi';
export const TAG = 'Assignment';
export const assignmentsApi = createApi({
  reducerPath: API_REDUCER_KEY,
  baseQuery: baseQuery,
  tagTypes: [TAG],
  endpoints: (builder) => ({
    getAssignments: builder.query<IAssignment[], string>({
      query: (classId: string) => _request.get(`classes/${classId}/assignments`),
      transformResponse: (response: IGenericGetAllResponse<IAssignment>) => response.data,

      providesTags: (result: IAssignment[] | undefined) =>
        result
          ? // successful query
            [...result.map(({ _id }) => ({ type: TAG, id: _id } as const)), { type: TAG, id: 'LIST' }]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: TAG, id: 'LIST' }],
    }),

    getAssignmentById: builder.query<IAssignment, { classId: string; assignmentId: string }>({
      query: ({ classId, assignmentId }) => _request.get(`classes/${classId}/assignments/${assignmentId}`),
      providesTags: [{ type: TAG, id: 'DATA' }],
    }),

    createAssignment: builder.mutation<IAssignment, { id: string; body: IAssignmentBody }>({
      query: ({ id, body }) => _request.post(`classes/${id}/assignments`, body),
      invalidatesTags: [{ type: TAG, id: 'LIST' }],
    }),

    updateAssignment: builder.mutation<IAssignment, { id: string; assignmentId: string; body: IAssignmentBody }>({
      query: ({ id, assignmentId, body }) => _request.put(`classes/${id}/assignments/${assignmentId}`, body),
      invalidatesTags: [
        { type: TAG, id: 'LIST' },
        { type: TAG, id: 'DATA' },
      ],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAssignmentsQuery,
  useCreateAssignmentMutation,
  useUpdateAssignmentMutation,
  useGetAssignmentByIdQuery,
} = assignmentsApi;
