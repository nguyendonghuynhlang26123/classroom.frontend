import { _request } from './utils';
import { IGenericGetAllResponse, IGradeReview, IGradeRequestBody } from 'common/interfaces';
// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../repository';

// Define a service using a base URL and expected endpoints
export const GRADE_REVIEW_API_REDUCER_KEY = 'gradeReviewApi';
export const GRADE_REVIEW_TAG = 'GradeReviews';
export const gradeReviewApi = createApi({
  reducerPath: GRADE_REVIEW_API_REDUCER_KEY,
  baseQuery: baseQuery,
  tagTypes: [GRADE_REVIEW_TAG],
  endpoints: (builder) => ({
    getAllGradeReviews: builder.query<IGradeReview[], string>({
      query: (id) => _request.get(`classes/${id}/grade-review?sort_by=created_at&sort_type=desc&per_page=100`),
      transformResponse: (response: IGenericGetAllResponse<IGradeReview>) => response.data,
      providesTags: () => [{ type: GRADE_REVIEW_TAG, id: 'LIST' }],
    }),

    getOneGradeReview: builder.mutation<IGradeReview, { id: string; gradeReviewId: string }>({
      query: ({ id, gradeReviewId }) => _request.get(`classes/${id}/grade-review/${gradeReviewId}`),
    }),

    createReviewRequest: builder.mutation<any, { id: string; body: IGradeRequestBody }>({
      query: ({ id, body }) => _request.post(`classes/${id}/grade-review`, body),
      invalidatesTags: [{ type: GRADE_REVIEW_TAG, id: 'LIST' }],
    }),

    createCommentRequest: builder.mutation<any, { id: string; reviewId: string; message: string }>({
      query: ({ id, reviewId, message }) => _request.post(`classes/${id}/grade-review/${reviewId}/comment`, { message: message }),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetAllGradeReviewsQuery, useCreateReviewRequestMutation, useGetOneGradeReviewMutation, useCreateCommentRequestMutation } =
  gradeReviewApi;
