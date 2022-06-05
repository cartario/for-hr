import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Level from '../components/Level';
import AppLoader from '../components/AppLoader';
import {
  fetchLessonsAsync,
  selectLessons,
  selectLoading,
  selectIsDataReady,
} from './Lessons/lessonsSlice';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const lessons = useSelector(selectLessons);
  const isDataReady = useSelector(selectIsDataReady);
  const levels = [...new Set(lessons.map((item) => item.level))];

  const handleOpen = (lesson) => {
    navigation.navigate('Lesson', {
      lessonId: lesson.id,
      lessonBooked: lesson.booked,
      lessonTitle: lesson.title,
    });
  };

  React.useEffect(() => {
    dispatch(fetchLessonsAsync());
  }, []);

  if (!isDataReady) {
    return <AppLoader />;
  }

  return (
    <View style={styles.center}>
      {lessons.length ? (
        <FlatList
          style={{ marginTop: 20 }}
          data={levels}
          keyExtractor={(levels) => Math.random().toString()}
          renderItem={({ item }) => (
            <Level
              title={item}
              lessons={lessons.filter((lesson) => lesson.level === item)}
              onOpen={handleOpen}
            />
          )}
        />
      ) : (
        <View style={styles.center}>
          <Text>Пока ничего нет</Text>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
