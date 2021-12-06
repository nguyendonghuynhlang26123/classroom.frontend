import { MultipleSxTypes } from 'common/type';

export const accordionSx: MultipleSxTypes = {
  root: {
    my: 0,
    overflow: 'hidden',

    '& .MuiAccordionSummary-root': {
      alignItems: 'center',
      cursor: 'pointer',

      ':hover': {
        bgcolor: 'grey.100',
      },

      '&.Mui-expanded': {
        borderBottom: 0.5,
        borderColor: 'divider',
      },
    },

    '& .MuiAccordionDetails-root': {
      py: 2,
      px: 3,
    },

    // "3 dots" buttons
    '& .MuiIconButton-root': {
      opacity: 0,
    },

    ':hover': {
      '& .MuiIconButton-root': {
        opacity: 1,
      },
    },
  },

  summaryTitle: {
    fontSize: 14,
    width: 400,
    fontWeight: 500,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  time: {
    fontSize: 12,
    color: 'grey.500',
  },
};
