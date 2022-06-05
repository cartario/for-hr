import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Lesson from '../components/Lesson';

import { THEME } from '../theme';

const Level = ({ lessons, title, onOpen }) => {
  const colors = THEME.BACKGROUNDS_COLORS;
  const lessonsWithColors = lessons.map((lesson, index) => {
    return { ...lesson, color: colors[index] };
  });

  return (
    <View style={styles.center}>
      <View style={styles.level}>
        <Text>Level {title}</Text>
      </View>
      <View style={styles.list}>
        {lessonsWithColors.map((item) => (
          <Lesson {...item} onOpen={() => onOpen(item)} key={item.id} levelNumber={title} />
        ))}
      </View>
    </View>
  );
};

export default Level;

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
  level: {
    alignItems: 'center',
    width: '50%',
    padding: 10,
    borderWidth: 2,
    borderColor: 'grey',
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: 300,
    marginTop: 20,
  },
});
