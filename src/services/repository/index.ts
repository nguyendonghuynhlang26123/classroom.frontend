import { IErrorResponse } from './../../common/interfaces/response/errorResponse.interface';
import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError } from 'axios';
import { omit } from 'lodash';
import { RootState } from '../../store';

const baseURL = `${process.env.REACT_APP_BACKEND_DOMAIN}/${process.env.REACT_APP_BACKEND_API_END_POINT}/${process.env.REACT_APP_API_VERSION}`;

export const repository = axios.create({
  baseURL,
  withCredentials: true,
});

const axiosRepository = (): BaseQueryFn => async (requestOpts) => {
  try {
    const result = await repository({
      ...requestOpts,
      headers: {
        ...omit(requestOpts.headers, ['user-agent']),
      },
    });

    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError as IErrorResponse;
    return { error: { status: err?.statusCode, data: err?.message } };
  }
};

export const baseQuery = axiosRepository();
