import { SxProps } from '@mui/system';
export const studentCellSx: SxProps = {
  p: 0,
  '& .MuiTypography-root': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};
