import React from 'react';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgetPasswordScreen from '../screens/ForgetPassword';

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

import { THEME } from '../theme';

const Stack = createStackNavigator();

export const AuthStackNavigator = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen options={{ title: 'Войти' }} name="Login" component={LoginScreen} />
      <Stack.Screen options={{ title: 'Войти' }} name="Register" component={RegisterScreen} />
      <Stack.Screen
        options={{ title: 'Войти' }}
        name="ForgetPassword"
        component={ForgetPasswordScreen}
      />
    </Stack.Navigator>
  );
};
