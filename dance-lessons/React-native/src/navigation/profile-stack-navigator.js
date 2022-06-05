import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import HomeScreen from '../screens/HomeScreen';
import LessonScreen from '../screens/LessonScreen';
import InfoModal from '../components/InfoModal';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHederIcon';
import HeaderTitleHome from '../components/HeaderTitleHome';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';

import { THEME } from '../theme';

const Stack = createStackNavigator();

export const ProfileStackNavigator = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ route }) => ({
          title: 'Личный кабинет',
          headerLeft: () => {
            return (
              <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item title="menu" iconName="menu" onPress={() => navigation.toggleDrawer()} />
              </HeaderButtons>
            );
          },
          headerRight: () => {
            return (
              <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item iconName="exit" onPress={() => {}} />
              </HeaderButtons>
            );
          },
        })}
        name="ProfileStack"
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
};
