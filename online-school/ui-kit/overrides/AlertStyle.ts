import {capitalize} from '@material-ui/core';
import {fade} from '@material-ui/core/styles';
import palette from './themeCore/palette';

const COLORS = ['error', 'info', 'warning', 'success'];

const getFilledStyles = () => {
  const styles = {}; 

  COLORS.forEach((each) => {
    styles[`filled${capitalize(each)}`] = {
      backgroundColor: each === 'error' ? palette[each].main : palette[each].dark,
    };
  });

  return styles;
};

const getStandardStyles = () => {
  const styles = {};

  COLORS.forEach((each) => {
    styles[`standard${capitalize(each)}`] = {
      color: palette[each].dark,
      backgroundColor: fade(palette[each].main, 0.1),
      '& $icon': {
        color: palette[each].dark,
      },
    };
  });

  return styles;
};

const getOutlinedStyles = () => {
  const styles = {};

  COLORS.forEach((each) => {
    styles[`outlined${capitalize(each)}`] = {
      color: palette[each].dark,
      borderColor: palette[each].dark,
      '& $icon': {
        color: palette[each].dark,
      },
    };
  });

  return styles;
};

const AlertProps = {}; // defaultProps here

const AlertOverrides = {
  root: {
    padding: '8px 16px',
    borderRadius: '16px',
  },
  ...getFilledStyles(),
  ...getStandardStyles(),
  ...getOutlinedStyles(),
};

export {AlertProps, AlertOverrides};
