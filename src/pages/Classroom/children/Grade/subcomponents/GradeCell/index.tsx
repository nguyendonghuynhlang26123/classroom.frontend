import { InputAdornment, TableCell, TextField, Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { GradeCellPropsType } from './type';
import { gradeCellSx } from './style';
import { useOnClickOutside } from 'components';
import { Close } from '@mui/icons-material';

const isValid = (value: undefined | number, total: number): boolean => {
  if (value) return value <= total;
  else return false;
};

export const GradeCell = ({ mark, total, onMarkChange, onCancel }: GradeCellPropsType) => {
  const cellRef = React.createRef();
  const [editingMode, setEditingMode] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<number | undefined>();
  const [inputErr, setInputErr] = React.useState<boolean>(false);

  useOnClickOutside(cellRef, () => {
    if (!value) setEditingMode(false);
  });

  React.useEffect(() => {
    if (value && value > total) setInputErr(true);
    else setInputErr(false);
  }, [value]);

  const handleCancel = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    setEditingMode(false);
    onCancel();
    setValue(undefined);
  };

  const handleEditInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(ev.target.value));
    onMarkChange(Number(ev.target.value));
  };
  return (
    <TableCell sx={gradeCellSx} onClick={() => setEditingMode(true)} ref={cellRef}>
      <Box>
        {editingMode ? (
          <>
            <IconButton onClick={handleCancel}>
              <Close />
            </IconButton>
            <TextField
              variant="standard"
              type="number"
              value={value}
              error={inputErr}
              helperText={inputErr && 'Invalid point'}
              autoFocus
              onChange={handleEditInput}
              InputProps={{
                endAdornment: <InputAdornment position="end">/{total}</InputAdornment>,
              }}
            />
          </>
        ) : (
          <>
            {mark && (
              <Typography className="result">
                {mark}
                <b>/{total}</b>{' '}
              </Typography>
            )}
          </>
        )}
      </Box>
    </TableCell>
  );
};
