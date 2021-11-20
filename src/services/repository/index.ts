import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError } from 'axios';
import { omit } from 'lodash';
import { RootState } from '../../store';

const baseURL = `${process.env.REACT_APP_BACKEND_DOMAIN}/${process.env.REACT_APP_BACKEND_API_END_POINT}/${process.env.REACT_APP_API_VERSION}`;

export const repository = axios.create({
  baseURL,
  withCredentials: true,
});

const axiosRepository =
  (): BaseQueryFn =>
  async (requestOpts, { getState }) => {
    try {
      const result = await repository({
        ...requestOpts,
        headers: {
          ...omit(requestOpts.headers, ['user-agent']),
        },
      });
      console.log('log ~ file: index.ts ~ line 23 ~ requestOpts', requestOpts);
      console.log('log ~ file: index.ts ~ line 23 ~ result', result);

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return { error: { status: err.response?.status, data: err.response?.data } };
    }
  };

export const baseQuery = axiosRepository();
