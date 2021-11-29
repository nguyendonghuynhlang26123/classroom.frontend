import { SxProps } from '@mui/system';
export const gradeCellSx: SxProps = {
  '& .MuiBox-root': { justifyContent: 'center', display: 'flex' },
  '& .MuiTextField-root': { width: '15ch', mx: 'auto', '& input, .MuiFormHelperText-root': { textAlign: 'right' } },

  '& .result': {
    fontSize: 24,
    '& b': {
      fontSize: 14,
      fontWeight: 600,
      color: 'primary.main',
    },
  },
};
