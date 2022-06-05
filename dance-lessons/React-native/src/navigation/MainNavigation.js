import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeTabNavigator } from './home-tab-navigator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { AuthStackNavigator } from '../navigation/auth-stack-navigator';

import { THEME } from '../theme';
import { ProfileStackNavigator } from '../navigation/profile-stack-navigator';

const Drawer = createDrawerNavigator();

const MainNavigation = ({ navigation }) => {
  const isAuth = false;

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContentOptions={{
          activeTintColor: THEME.MAIN_COLOR,
          labelStyle: {
            fontFamily: 'open-bold',
          },
        }}
      >
        <Drawer.Screen options={{ title: 'Главная' }} name="Home" component={HomeTabNavigator} />
        {isAuth ? (
          <Drawer.Screen
            options={{ title: 'Личный кабинет' }}
            name="Profile"
            component={ProfileStackNavigator}
          />
        ) : (
          <Drawer.Screen options={{ title: 'Войти' }} name="Auth" component={AuthStackNavigator} />
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
