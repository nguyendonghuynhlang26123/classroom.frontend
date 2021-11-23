import { _request } from './utils';
import { IGenericGetAllResponse, IAssignmentTopic } from 'common/interfaces';
// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../repository';

// Define a service using a base URL and expected endpoints
export const TOPIC_API_REDUCER_KEY = 'topicApi';
export const TOPIC_TAG = 'Topics';
export const topicsApi = createApi({
  reducerPath: TOPIC_API_REDUCER_KEY,
  baseQuery: baseQuery,
  tagTypes: [TOPIC_TAG],
  endpoints: (builder) => ({
    getAllTopics: builder.query<IAssignmentTopic[], string>({
      query: (classId: string) => _request.get(`classes/${classId}/class-topics`),
      transformResponse: (response: IGenericGetAllResponse<IAssignmentTopic>) => response.data,
      providesTags: (result: IAssignmentTopic[] | undefined) =>
        result
          ? // successful query
            [...result.map(({ _id }) => ({ type: TOPIC_TAG, id: _id } as const)), { type: TOPIC_TAG, id: 'LIST' }]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: TOPIC_TAG, id: 'LIST' }],
    }),

    createTopic: builder.mutation<IAssignmentTopic, { id: string; body: IAssignmentTopic }>({
      query: ({ id, body }) => _request.post(`classes/${id}/class-topics`, body),
      invalidatesTags: [{ type: TOPIC_TAG, id: 'LIST' }],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetAllTopicsQuery, useCreateTopicMutation } = topicsApi;
