import { Stack, Typography, Button } from '@mui/material';
import React from 'react';
import { NoResourceDisplayProps } from './type';
import Kite from 'assets/images/kite.svg';
import { styleSx } from './style';

export const NoResourceDisplay = ({ title, img = Kite, onClick }: NoResourceDisplayProps) => {
  return (
    <Stack direction="column" sx={styleSx.root} spacing={1}>
      <img src={img} width="20%" />
      <Stack direction="column" sx={styleSx.textContainer}>
        <Typography sx={styleSx.textTitle}>Create {title}</Typography>
        <Typography sx={styleSx.textDescription}>
          Click on the below buttons to <br /> navigate to the {title} creation screen
        </Typography>
        <Button sx={styleSx.btn} variant="contained" onClick={onClick}>
          Create
        </Button>
      </Stack>
    </Stack>
  );
};
