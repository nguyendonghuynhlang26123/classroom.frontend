import { MultipleSxTypes } from 'common/type';

export const styleSx: MultipleSxTypes = {
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    px: 2,
    py: 4,

    '& img': {
      width: '20%',
    },
  },

  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    my: 4,
    textAlign: 'center',
  },

  textTitle: {
    fontWeight: 600,
    fontSize: 24,
  },
  textDescription: {
    fontWeight: 500,
    fontSize: 14,
    color: 'grey.600',
    my: 1,
  },
  btn: {
    my: 1,
  },
};
