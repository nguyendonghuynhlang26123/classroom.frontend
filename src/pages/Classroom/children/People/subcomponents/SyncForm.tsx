import {
  Avatar,
  Button,
  FormControl,
  InputLabel,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { IClassroomUser } from 'common/interfaces';
import { SimpleModal } from 'components';
import React from 'react';

type SyncFormProps = {
  open: boolean;
  selectedId?: string;
  students: IClassroomUser[];
  handleClose: () => void;
  onSubmit: (id: string) => any;
};

export const SyncForm = ({ open, selectedId, students, handleClose, onSubmit }: SyncFormProps) => {
  const [selected, setSelected] = React.useState<string>('0');

  React.useEffect(() => {
    if (selectedId) setSelected(selectedId);
  }, [selectedId]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
  };

  const handleSubmit = () => {
    if (selected !== '0') onSubmit(selected);
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
            defaultValue={'0'}
            onChange={handleChange}
            placeholder="Choose account"
          >
            <MenuItem value={'0'}>No user</MenuItem>
            {students.map((u: IClassroomUser, index) => (
              <MenuItem value={u.user_id._id} key={index}>
                <Stack direction="row" alignItems="center">
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
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleSubmit()} disabled={selectedId === selected || selected === '0'}>
            Set
          </Button>
        </Stack>
      </React.Fragment>
    </SimpleModal>
  );
};
