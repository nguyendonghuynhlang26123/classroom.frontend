import { MultipleSxTypes } from 'common/type';

export const accordionSx: MultipleSxTypes = {
  root: {
    borderRadius: 2,
    my: 1.5,
    overflow: 'hidden',

    '& .MuiAccordionSummary-root': {
      alignItems: 'center',
      cursor: 'pointer',

      '&.Mui-expanded': {
        borderBottom: 1,
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
      boxShadow: 3,
      '& .MuiIconButton-root': {
        opacity: 1,
      },
    },
    '&.Mui-expanded': {
      boxShadow: 3,
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
