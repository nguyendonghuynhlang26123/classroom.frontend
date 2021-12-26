import { InputAdornment, TableCell, TextField, Box, IconButton, Typography, Stack } from '@mui/material';
import React from 'react';
import { GradeCellPropsType } from './type';
import { gradeCellSx } from './style';
import { useDebounce, useOnClickOutside } from 'components';
import { Check, Close } from '@mui/icons-material';

const isValid = (value: undefined | number, total: number): boolean => {
  if (value) return value <= total && value >= 0;
  else return false;
};

const GradeCellComponent = ({ mark, total, onSave }: GradeCellPropsType) => {
  const cellRef = React.createRef();
  const [editingMode, setEditingMode] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<number>(mark as number);
  const [inputErr, setInputErr] = React.useState<boolean>(false);
  const debounceInputValue = useDebounce<number | undefined>(value, 300);

  useOnClickOutside(cellRef, () => {
    if (value === undefined && mark === value && !inputErr) setEditingMode(false);
  });

  React.useEffect(() => {
    if (!debounceInputValue) return;
    if (isValid(debounceInputValue, total)) setInputErr(false);
    else setInputErr(true);
  }, [debounceInputValue]);

  React.useEffect(() => {
    setValue(mark as number);
  }, [mark]);

  const handleCancel = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    setEditingMode(false);
    setValue(mark as number);
  };

  const handleSave = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    setEditingMode(false);
    onSave(value as number);
    setValue(mark as number);
  };

  const handleEditInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    if (value === '') return;
    setValue(Number(value));
  };

  return (
    <TableCell sx={gradeCellSx} onClick={() => setEditingMode(true)} ref={cellRef}>
      {editingMode ? (
        <Box>
          <Stack direction="column">
            <IconButton onClick={handleSave} color="success" disabled={inputErr}>
              <Check fontSize="small" />
            </IconButton>
            <IconButton onClick={handleCancel} color="error">
              <Close fontSize="small" />
            </IconButton>
          </Stack>
          <div>
            <TextField
              variant="standard"
              type="number"
              value={value ?? ''}
              error={inputErr}
              helperText={inputErr && 'Invalid point'}
              autoFocus
              onChange={handleEditInput}
              InputProps={{
                endAdornment: <InputAdornment position="end">/{total}</InputAdornment>,
              }}
            />
          </div>
        </Box>
      ) : (
        <>{mark !== undefined && <Typography className="result">{mark}</Typography>}</>
      )}
    </TableCell>
  );
};

export const GradeCell = React.memo(GradeCellComponent);
