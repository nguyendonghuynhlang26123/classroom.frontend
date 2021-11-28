import { _request } from './utils';
import { IImportedStudents } from 'common/interfaces';
// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../repository';

// Define a service using a base URL and expected endpoints
export const CLASS_STUDENT_API_REDUCER_KEY = 'classStudentsApi';
export const CLASS_STUDENT_TAG = 'ClassStudents';
export const classStudentApi = createApi({
  reducerPath: CLASS_STUDENT_API_REDUCER_KEY,
  baseQuery: baseQuery,
  tagTypes: [CLASS_STUDENT_TAG],
  endpoints: (builder) => ({
    getAllStudents: builder.query<IImportedStudents, string>({
      query: (id: string) => _request.get(`classes/${id}/students`),
      providesTags: (result: IImportedStudents | undefined) =>
        result
          ? // successful query
            [
              { type: CLASS_STUDENT_TAG, id: result._id },
              { type: CLASS_STUDENT_TAG, id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: CLASS_STUDENT_TAG, id: 'LIST' }],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetAllStudentsQuery } = classStudentApi;
