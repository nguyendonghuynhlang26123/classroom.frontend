import { SxProps } from '@mui/system';
export const gradeCellSx: SxProps = {
  '& .MuiBox-root': { justifyContent: 'space-between', display: 'flex', alignItems: 'center' },
  '& .MuiTextField-root': { width: '10ch', mx: 'auto', '& input, .MuiFormHelperText-root': { textAlign: 'right' } },

  '& .result': {
    fontSize: 16,
    textAlign: 'center',
    // color: 'primary.main',
    '& b': {
      fontSize: 14,
      fontWeight: 600,
      color: 'black',
    },
  },
};
