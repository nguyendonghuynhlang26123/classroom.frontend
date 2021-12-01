import { InputAdornment, TableCell, TextField, Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { GradeCellPropsType } from './type';
import { gradeCellSx } from './style';
import { useDebounce, useOnClickOutside } from 'components';
import { Close } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const isValid = (value: undefined | number, total: number): boolean => {
  if (value) return value <= total && value >= 0;
  else return false;
};

const validationSchema = yup.object({
  code: yup
    .string()
    .min(6, 'Classroom Title should be of 6 characters length')
    .max(6, 'Classroom Title should be of 6 characters length')
    .matches(/^[ A-Za-z0-9]*$/, 'Alphabetical or numeral characters only!')
    .required('Classroom code is required'),
});

const GradeCellComponent = ({ mark, total, onMarkChange, onCancel, enableEdit = true }: GradeCellPropsType) => {
  const cellRef = React.createRef();
  const [editingMode, setEditingMode] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<number>();
  const [inputErr, setInputErr] = React.useState<boolean>(false);
  const debounceInputValue = useDebounce<number | undefined>(value, 1000);

  useOnClickOutside(cellRef, () => {
    if (!value || mark === value) setEditingMode(false);
  });

  React.useEffect(() => {
    if (!debounceInputValue) return;
    if (isValid(debounceInputValue, total)) setInputErr(false);
    else setInputErr(true);

    onMarkChange(Number(debounceInputValue));
  }, [debounceInputValue]);

  React.useEffect(() => {
    setValue(mark);
  }, [mark]);

  React.useEffect(() => {
    if (!enableEdit) setEditingMode(false);
  }, [enableEdit]);

  const handleCancel = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    setEditingMode(false);
    onCancel();
    setValue(undefined);
  };

  const handleEditInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    if (value === '') return;
    setValue(Number(value));
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
              value={value || ''}
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
                {/* <b>/{total}</b>{' '} */}
              </Typography>
            )}
          </>
        )}
      </Box>
    </TableCell>
  );
};

export const GradeCell = React.memo(GradeCellComponent);
