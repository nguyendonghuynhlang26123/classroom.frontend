import { colors } from '@mui/material';
import { MultipleSxTypes } from 'common/type';

export const gradeSx: MultipleSxTypes = {
  root: {
    width: '100%',
    mt: -4,
    maxHeight: 'calc(100vh - 64px)',
    minHeight: 'calc(100vh - 64px)',
  },

  table: {
    minWidth: '100vw',
    width: '100%',
    tableLayout: 'fixed',
    position: 'relative',

    '& .MuiTableBody-root': {
      overflow: 'auto',
    },

    '& .MuiTableRow-root:nth-of-type(even)': {
      backgroundColor: 'grey.100',
    },
    '& .MuiTableRow-root:nth-of-type(odd)': {
      backgroundColor: 'white',
    },
    '& .MuiTableCell-root': {
      p: 1,
      width: 150,
      height: 90,
      borderRight: 1,
      borderColor: 'divider',
      overflow: 'hidden',
      '&.student-collumn': {
        zIndex: 3,
        position: 'sticky',
        width: 200,
        left: 0,
        bgcolor: 'inherit',
      },
      '&.header': {
        zIndex: '6 !important',
        borderLeft: 0,
      },
      '&.total-collumn': {
        zIndex: 5,
        right: 0,
        bgcolor: colors.blue[50],
        position: 'sticky',
        borderLeft: 1,
        borderColor: colors.blue[100],
        textAlign: 'center',
        width: 80,
        '& .MuiTypography-body1': { fontWeight: 600, fontSize: 18 },
        '& .MuiTypography-body2': { fontSize: 12 },
      },
    },
    '& .placeholder': {
      width: '99%',
    },

    '& .assignment_title': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: 'primary.main',
      cursor: 'pointer',
      ':hover': {
        textDecoration: 'underline',
      },
    },
    '& .time': {
      fontSize: 10,
      color: 'grey.500',
    },
    '& .header_point': {
      fontSize: 14,
      py: 0.5,
      color: 'grey.600',
      borderTop: 1,
      borderColor: 'divider',
      mt: 2,
      '& .icon': {
        cursor: 'pointer',
        ':hover': {
          color: 'primary.main',
        },
      },
    },
  },
};
