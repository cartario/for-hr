/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';

import Alert from 'ui-kit/Alert';
import {AlertProps} from 'ui-kit/types/Alert';

export default {
  title: 'UI-kit/Alert',
  component: Alert,
  argTypes: {
    withAction: {control: 'boolean'},
    actionName: {control: 'text'},
    title: {control: 'text'},
    message: {control: 'text'},
    color: {
      options: ['error', 'info', 'success', 'warning'],
      type: 'radio',
    },
    severity: {
      options: ['error', 'info', 'success', 'warning'],
      type: 'radio',
    },
    variant: {
      options: ['filled', 'outlined', 'standard'],
      type: 'radio',
    },
  },
} as Meta;

const Template: Story<AlertProps> = (args) => {
  const {actionName, withAction} = args;

  return (
    <Alert
      action={
				withAction
				  ? {
				    name: actionName as string,
				    cb: () => {},
					  }
				  : null
			}
      {...args}
    />
  );
};

export const Filled = Template.bind({});
export const Outlined = Template.bind({});
export const Standard = Template.bind({});

Filled.args = {
  variant: 'filled',
  title: 'Hello! I am title',
  message: 'Hello! I am message',
  actionName: 'action',
  withAction: true,
};

Outlined.args = { 
  variant: 'outlined',
  title: 'Hello! I am title',
  message: 'Hello! I am message',
  withAction: true,
  actionName: 'action',
};

Standard.args = {
  variant: 'standard',
  title: 'Hello! I am title',
  message: 'Hello! I am message',
  withAction: true,
  actionName: 'action',
};
