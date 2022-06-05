import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { THEME } from '../theme';
import { selectUser } from '../screens/User/userSlice';
import { selectLessonById } from '../screens/Lessons/lessonsSlice';

const HeaderTitleHome = ({ title, id = null }) => {
  const { level, loading, totalScore } = useSelector(selectUser);
  const lesson = useSelector(selectLessonById(id));

  return (
    <View style={styles.wrapTitle}>
      <View style={styles.levelCount}>
        <Text style={{ color: 'white' }}>{loading ? '...' : level}</Text>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>
          {lesson ? lesson.title : title === 'BookedLessons' ? 'Избранное' : title}
        </Text>
      </View>

      <View style={{ ...styles.levelCount, ...styles.scoreCount }}>
        <Text style={{ color: 'white' }}>{loading ? '...' : totalScore}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  levelCount: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    backgroundColor: 'orange',
    borderRadius: 50,
  },
  scoreCount: {
    backgroundColor: 'purple',
    borderRadius: 5,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  titleText: {
    color: THEME.MAIN_COLOR,
    fontSize: 16,
    fontFamily: 'open-bold',
  },
});

export default HeaderTitleHome;
