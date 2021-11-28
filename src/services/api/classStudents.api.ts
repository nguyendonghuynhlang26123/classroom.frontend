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
      providesTags: [{ type: CLASS_STUDENT_TAG, id: 'DATA' }],
    }),
    updateAccountSync: builder.mutation<any, { class_id: string; body: { student_id: string; user_id: string } }>({
      query: ({ class_id, body }) => _request.put(`classes/${class_id}/students/account-sync`, body),
      invalidatesTags: [{ type: CLASS_STUDENT_TAG, id: 'DATA' }],
    }),
    uploadStudentList: builder.mutation<any, { class_id: string; body: any }>({
      query: ({ class_id, body }) => _request.post(`classes/${class_id}/students`, body),
      invalidatesTags: [{ type: CLASS_STUDENT_TAG, id: 'DATA' }],
    }),
    uploadAndUpdateStudentList: builder.mutation<any, { class_id: string; body: any }>({
      query: ({ class_id, body }) => _request.put(`classes/${class_id}/students`, body),
      invalidatesTags: [{ type: CLASS_STUDENT_TAG, id: 'DATA' }],
    }),
  }),
});

export const {
  useGetAllStudentsQuery,
  useUpdateAccountSyncMutation,
  useUploadAndUpdateStudentListMutation,
  useUploadStudentListMutation,
} = classStudentApi;
