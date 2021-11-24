import React from 'react';
import { Link, Typography, Box, Checkbox, Stack, Button } from '@mui/material';
import { SimpleModal } from 'components';
import { disclaimerStyle } from './style';
import { DisclaimerProps } from './type';

export const Disclaimer = ({ open, handleClose, onSubmit }: DisclaimerProps) => {
  const [checkbox, setCheckbox] = React.useState<boolean>(false);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckbox(event.target.checked);
  };

  return (
    <SimpleModal open={open} handleClose={handleClose} title="Using Classroom at a school with students?" width={300}>
      <Box sx={{ pt: 1 }}>
        <Typography variant="body2" gutterBottom component="p" sx={{ pt: 1 }}>
          If so, your school must sign up for a free Google Workspace for Education account before you can use
          Classroom. <Link href="#">privacy and security</Link>
        </Typography>
        <Typography variant="body2" gutterBottom component="p" sx={{ pt: 1 }}>
          Google Workspace for Education lets schools decide which Google services their students can use, and provides
          additional <Link href="#">privacy and security</Link> protections that are important in a school setting.
          Students cannot use Google Classroom at a school with personal accounts.
        </Typography>
        <Box sx={disclaimerStyle.checkboxContainer}>
          <div>
            <Checkbox checked={checkbox} onChange={handleCheck} />
          </div>
          <Typography variant="body2" gutterBottom component="p" sx={{ pt: 1 }}>
            I've read and understand the above notice, and I'm not using Classroom at a school with students
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={handleClose}>Go back</Button>
          <Button onClick={onSubmit} disabled={!checkbox}>
            Continue
          </Button>
        </Stack>
      </Box>
    </SimpleModal>
  );
};
