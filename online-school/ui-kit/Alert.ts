import {memo, useState} from 'react';
import {
  Button, Collapse, IconButton, Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Alert as MuiAlert, AlertTitle} from '@material-ui/lab';
import palette from 'themes/2020_august/themeCore/palette';

import {CloseIcon} from '../Icons';
import {AlertProps} from '../types/Alert';

const useStyles = makeStyles(() => ({
  root: {
    alignItems: 'center',
  },
})); 

const Alert = ({
  className, action, title, message, color, variant, severity, ...others
}: AlertProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const onActionClick = () => {
    action.cb();
    setOpen(false);
  };

  const renderAction = () => (
    <>
      <Button color="inherit" size="small" variant="text" onClick={onActionClick}>
        {action.name}
      </Button>
      <IconButton title="ChatIcon" onClick={() => setOpen(false)}>
        <CloseIcon htmlColor={variant === 'filled' && palette.default.main} />
      </IconButton>
    </>
  );

  return (
    <Collapse in={open}>
      <MuiAlert
        className={classes.root}
        {...others}
        color={color}
        variant={variant}
        severity={severity}
        action={action && renderAction()}
      >
        <AlertTitle color="inherit">{title}</AlertTitle>
        <Typography color="inherit" variant="subtitle2">
          {message}
        </Typography>
      </MuiAlert>
    </Collapse>
  );
};

export default memo(Alert);
