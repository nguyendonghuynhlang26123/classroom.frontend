import { MultipleSxTypes } from 'common/type';

export const cardSx: MultipleSxTypes = {
  card: {
    ':hover': {
      boxShadow: '0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)',
    },
    maxWidth: 290,
    border: 2,
    borderColor: 'grey.200',
    borderRadius: 2,
  },
  header: {
    flexWrap: 'nowrap',
    whiteSpace: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginTop: '-100px',
    p: 2,
    pb: 4,
    color: '#fff',

    '& > .MuiBox-root': {
      cursor: 'pointer',
      ':hover': {
        textDecoration: 'underline',
      },

      '& > .MuiBox-root': {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      },
    },
  },

  header_title: {
    fontSize: 22,
  },

  header_section: {
    fontSize: 13,
  },

  actions: {
    borderTop: 2,
    borderColor: 'grey.200',
    justifyContent: 'end',
  },
};
