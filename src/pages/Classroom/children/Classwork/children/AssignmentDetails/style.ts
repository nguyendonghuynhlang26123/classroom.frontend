import { MultipleSxTypes } from 'common/type';

export const assignmentDetailsSx: MultipleSxTypes = {
  root: {
    maxWidth: '1200',
    mx: 'auto',
    py: 0,
    '& .MuiGrid-item': {
      pt: 0,
      mt: 4,
    },

    '& .MuiStack-root': {
      alignItems: 'center',
    },
  },

  header: {
    textTransform: 'capitalize',
    '& .MuiTypography-root': {
      fontSize: 32,
      color: 'primary.main',
    },
    '& .MuiAvatar-root': {
      width: 38,
      height: 38,
      mr: 2,
    },
    '& .MuiIconButton-root': {
      ml: 'auto',
    },
  },
  time: {
    fontSize: 13,
    color: 'grey.500',
  },

  subheader: {
    pl: '54px',
    pr: 4,

    '& .total_point': {
      fontWeight: 500,
      fontSize: 14,
      mt: 1,
      color: 'grey.900',
    },
    '& .divider': { bgcolor: 'primary.main', my: 2 },
  },

  container: {
    ml: '54px',
    mr: 4,
    '& .divider': { my: 2 },
    '& .htmlContainer': {
      px: 2,
    },
    '& .MuiAccordion-root': {
      boxShadow: 0,
      borderRadius: 2,
      overflow: 'hidden',
      '&.Mui-expanded': {
        border: 1,
        borderColor: 'divider',
      },
    },
    '& .MuiAccordionSummary-root': {
      ':hover': {
        bgcolor: 'grey.100',
      },
    },
  },

  submitZone: {
    p: 3,
    borderRadius: 2,
    border: 1,
    borderColor: 'divider',
    boxShadow: 2,
    '& .MuiTypography-root': {
      fontSize: 20,
      fontWeight: 600,
    },
    '& .MuiButton-root:first-of-type': {
      my: 1,
      textTransform: 'capitalize',
    },
  },
};
