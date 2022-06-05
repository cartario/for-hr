import React from 'react';
import {Platform} from 'react-native';
import {HeaderButton} from 'react-navigation-header-buttons';
import {THEME} from '../theme';
import {Ionicons} from '@expo/vector-icons';

export const AppHeaderIcon = (props) => {
  return (<HeaderButton 
    {...props}
    IconComponent={Ionicons}
    iconSize={28}
    color={THEME.MAIN_COLOR}    
  />)
}