import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLessonsAsync, selectLessons, selectLoading } from './Lessons/lessonsSlice';
import Level from '../components/Level';
import AppLoader from '../components/AppLoader';

const BookedLessonsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const lessons = useSelector(selectLessons);
  const { isLoading } = useSelector(selectLoading);

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

  if (!lessons.length) {
    return (
      <View style={styles.center}>
        <Text>в избранном пока ничего нет</Text>
      </View>
    );
  }

  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <View style={styles.center}>
      {/* <Text>LessonsScreen</Text> */}

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
    </View>
  );
};

export default BookedLessonsScreen;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
