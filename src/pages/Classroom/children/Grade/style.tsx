import { MultipleSxTypes } from 'common/type';

export const gradeSx: MultipleSxTypes = {
  root: {
    width: '100%',
    // mt: -4,
    maxHeight: 'calc(100vh - 100px)',
    minHeight: 'calc(100vh - 100px)',
  },

  userInfo: {
    p: 0,
  },

  table: {
    minWidth: '100vw',
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
      width: 200,
      minHeight: 100,
      borderRight: 1,
      borderColor: 'divider',
      overflow: 'hidden',
      '&.fixed-collumn': {
        zIndex: 3,
        position: 'sticky',
        width: 300,
        minHeight: 200,
        left: 0,
        bgcolor: 'inherit',
      },
      '&.fixed-header': {
        zIndex: 4,
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
      fontSize: 12,
      color: 'grey.500',
    },
    '& .header_point': {
      fontSize: 14,
      color: 'grey.600',
      borderTop: 1,
      borderColor: 'divider',
      mt: 2,
    },
  },
};
