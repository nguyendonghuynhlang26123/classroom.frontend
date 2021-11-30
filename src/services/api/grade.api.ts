import { _request } from './utils';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../repository';

import type { IGradingAssignment, IGradingBody, IGenericGetAllResponse } from 'common/interfaces';

// Define a service using a base URL and expected endpoints
export const GRADE_API_REDUCER_KEY = 'GradeApi';
export const GRADE_TAG = 'Grades';
export const gradeApi = createApi({
  reducerPath: GRADE_API_REDUCER_KEY,
  baseQuery: baseQuery,
  tagTypes: [GRADE_TAG],
  endpoints: (builder) => ({
    getAllGrading: builder.query<IGradingAssignment[], string>({
      query: (classId: string) => _request.get(`classes/${classId}/grading?sort_by=student_id,assignment_id&sort_type=asc&per_page=1000`),
      transformResponse: (response: IGenericGetAllResponse<IGradingAssignment>) => response.data,
      providesTags: (result: IGradingAssignment[] | undefined) =>
        result
          ? // successful query
            [...result.map(({ _id }) => ({ type: GRADE_TAG, id: _id } as const)), { type: GRADE_TAG, id: 'LIST' }]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: GRADE_TAG, id: 'LIST' }],
    }),

    createGrading: builder.mutation<any, { classId: string; body: IGradingBody[] }>({
      query: ({ classId, body }) => _request.post(`classes/${classId}/grading`, { data: body }),
      invalidatesTags: [{ type: GRADE_TAG, id: 'LIST' }],
    }),
    updateGrading: builder.mutation<any, { classId: string; body: IGradingBody[] }>({
      query: ({ classId, body }) => _request.put(`classes/${classId}/grading`, { data: body }),
      invalidatesTags: [{ type: GRADE_TAG, id: 'LIST' }],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetAllGradingQuery, useCreateGradingMutation, useUpdateGradingMutation } = gradeApi;
