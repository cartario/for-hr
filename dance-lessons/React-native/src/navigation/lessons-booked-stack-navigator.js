import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import BookedLessonsScreen from '../screens/BookedLessonsScreen';
import LessonScreen from '../screens/LessonScreen';
import InfoModal from '../components/InfoModal';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHederIcon';
import HeaderTitleHome from '../components/HeaderTitleHome';

import { THEME } from '../theme';

const Stack = createStackNavigator();

export const BookedLessonsNavigator = ({ navigation }) => {
  const dispatch = useDispatch();

  const [modal, setModal] = React.useState(false); //исправить на route.params

  const handleToggleBooked = (id) => {
    // dispatch(Operations.updateLessonToggleBooked(id))
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ route }) => ({
          headerTitle: () => <HeaderTitleHome title={route.name} />,
          headerRight: () => {
            return (
              <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item iconName="information-circle" onPress={() => setModal(true)} />
                <InfoModal visible={modal} onCancel={setModal} />
              </HeaderButtons>
            );
          },
          headerLeft: () => {
            return (
              <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item title="menu" iconName="menu" onPress={() => navigation.toggleDrawer()} />
              </HeaderButtons>
            );
          },
        })}
        name="BookedLessons"
        component={BookedLessonsScreen}
      />
      <Stack.Screen
        options={({ navigation, route }) => ({
          headerTintColor: THEME.MAIN_COLOR,
          headerBackTitle: 'Избранное',
          headerTitle: () => <HeaderTitleHome title={route.name} id={route.params.lessonId} />,
          headerRight: () => {
            return (
              <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item
                  title="menu"
                  iconName={route.params.lessonBooked ? 'star' : 'star-outline'}
                  onPress={() => {
                    handleToggleBooked(route.params.lessonId);
                    navigation.setParams({ lessonBooked: !route.params.lessonBooked });
                  }}
                />
              </HeaderButtons>
            );
          },
        })}
        name="Lesson"
        component={LessonScreen}
      />
    </Stack.Navigator>
  );
};
