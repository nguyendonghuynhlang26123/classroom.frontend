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
          : // an error occurred, but we still want to refetch this query when mutation
            [{ type: GRADE_TAG, id: 'LIST' }],
    }),

    createGrading: builder.mutation<any, { classId: string; body: IGradingBody }>({
      query: ({ classId, body }) => _request.post(`classes/${classId}/grading`, body),
      invalidatesTags: [{ type: GRADE_TAG, id: 'LIST' }],
    }),
    updateGrading: builder.mutation<any, { classId: string; body: IGradingBody }>({
      query: ({ classId, body }) => _request.put(`classes/${classId}/grading`, body),
      invalidatesTags: ({ _id }) => [{ type: GRADE_TAG, id: _id }],
    }),
    finalizeGrading: builder.mutation<any, { classId: string; assignmentId: string }>({
      query: ({ classId, assignmentId }) => _request.put(`classes/${classId}/grading/finalize`, { assignment_id: assignmentId }),
      invalidatesTags: [{ type: GRADE_TAG, id: 'LIST' }],
    }),

    fetchFinalGrades: builder.mutation<any, { classId: string; studentId: string }>({
      query: ({ classId, studentId }) => _request.get(`classes/${classId}/grading/student/${studentId}`),
      transformResponse: (response: IGenericGetAllResponse<IGradingAssignment>) => response.data,
    }),
    importGrading: builder.mutation<any, { classId: string; assignmentId: string; body: any }>({
      query: ({ classId, assignmentId, body }) => _request.post(`classes/${classId}/grading/assignment/${assignmentId}/import`, body),
      invalidatesTags: [{ type: GRADE_TAG, id: 'LIST' }],
    }),
    downloadGrading: builder.mutation<any, { classId: string; assignmentId: string }>({
      query: ({ classId, assignmentId }) => _request.get(`classes/${classId}/grading/assignment/${assignmentId}/export`),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllGradingQuery,
  useCreateGradingMutation,
  useUpdateGradingMutation,
  useImportGradingMutation,
  useDownloadGradingMutation,
  useFinalizeGradingMutation,
  useFetchFinalGradesMutation,
} = gradeApi;
