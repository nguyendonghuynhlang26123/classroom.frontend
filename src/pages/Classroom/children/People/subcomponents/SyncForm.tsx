import React from 'react';
import {
  Typography,
  Box,
  Stack,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@mui/material';
import { SimpleModal } from 'components';
import { IClassroomUser, UserRole } from 'common/interfaces';

type SyncFormProps = {
  open: boolean;
  selectedId?: string;
  students: IClassroomUser[];
  handleClose: () => void;
  onSubmit: (id: string) => any;
};

export const SyncForm = ({ open, selectedId, students, handleClose, onSubmit }: SyncFormProps) => {
  const [selected, setSelected] = React.useState<string>('');

  React.useEffect(() => {
    if (selectedId) setSelected(selectedId);
  }, [selectedId]);
  console.log('log ~ file: SyncForm.tsx ~ line 34 ~ React.useEffect ~ selectedId', selected);

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
  };

  const handleSubmit = () => {
    onSubmit(selected);
  };

  return (
    <SimpleModal open={open} handleClose={handleClose} title={'Update user for this student account'} width={450}>
      <React.Fragment>
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel id="student-selection">Account</InputLabel>
          <Select
            labelId="account-label"
            id="account-label"
            value={selected}
            label="Account"
            onChange={handleChange}
            placeholder="Choose account"
          >
            {students.map((u: IClassroomUser, index) => (
              <MenuItem value={u.user_id._id} key={index}>
                <ListItem alignItems="center">
                  <ListItemAvatar>
                    {u.user_id.avatar ? (
                      <Avatar alt={u.user_id.first_name} src={u.user_id.avatar} sx={{ bgcolor: 'primary.main' }} />
                    ) : (
                      <Avatar sx={{ bgcolor: 'primary.main' }}>{u.user_id.first_name.charAt(0)}</Avatar>
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    primary={u.user_id.first_name + ' ' + u.user_id.last_name}
                    secondary={
                      <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                        {u.user_id.email}
                      </Typography>
                    }
                  />
                </ListItem>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleSubmit()} disabled={selectedId === selected}>
            Set
          </Button>
        </Stack>
      </React.Fragment>
    </SimpleModal>
  );
};
