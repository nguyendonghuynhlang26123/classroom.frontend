import { SxProps } from '@mui/system';
export const gradeCellSx: SxProps = {
  '& .MuiBox-root': { justifyContent: 'center', display: 'flex', alignItems: 'center' },
  '& .MuiTextField-root': { width: '15ch', mx: 'auto', '& input, .MuiFormHelperText-root': { textAlign: 'right' } },

  '& .result': {
    fontSize: 16,
    textAlign: 'right',
    // color: 'primary.main',
    '& b': {
      fontSize: 14,
      fontWeight: 600,
      color: 'black',
    },
  },
};
