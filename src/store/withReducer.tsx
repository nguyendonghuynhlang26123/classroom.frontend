import { Reducer, AnyAction } from '@reduxjs/toolkit';
import React, { FC } from 'react';
import { injectReducer } from '.';

const withReducer =
  (key: string, reducer: Reducer<any, AnyAction>) =>
  (Component: FC) =>
  ({ ...props }) => {
    React.useEffect(() => {
      injectReducer(key, reducer);
    }, []);
    return <Component {...props} />;
  };

export default withReducer;
