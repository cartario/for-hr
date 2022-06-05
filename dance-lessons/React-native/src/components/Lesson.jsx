import React from 'react';
import { FlatList, View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { THEME } from '../theme';
import { selectUser } from '../screens/User/userSlice';

const Lesson = ({ id, price, title, onOpen, color, levelNumber }) => {
  const user = useSelector(selectUser);
  // const { level, totalScore , scoreLessons} = useSelector(({ user }) => user);
  const { level, totalScore, scoreLessons } = user;
  const disabled = level < levelNumber;

  // const score = scoreLessons.find((item) => item.id === id);
  const score = totalScore;

  if (!score) {
    return null;
  }

  return (
    <View>
      {/* <TouchableOpacity
        disabled={disabled}
        style={
          disabled
            ? { ...styles.circle, backgroundColor: color, ...styles.disabled }
            : { ...styles.circle, backgroundColor: color }
        }
        onPress={onOpen}
      >
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        disabled={disabled}
        onPress={onOpen}
        style={
          disabled
            ? { ...styles.circle, backgroundColor: color, ...styles.disabled }
            : { ...styles.circle, backgroundColor: color }
        }
      >
        <AnimatedCircularProgress
          style={{ backgroundColor: color, borderRadius: 50 }}
          size={80}
          width={7}
          fill={(score.score / 60) * 100}
          rotation={0}
          tintColor={'tomato'}
          // onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="grey"
        >
          {(fill) => <Text style={styles.title}>{title}</Text>}
        </AnimatedCircularProgress>
      </TouchableOpacity>
    </View>
  );
};

export default Lesson;

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    marginBottom: 20,
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'lightgrey',
  },
  title: {
    padding: 10,
    textAlign: 'center',
    fontFamily: 'open-bold',
    color: '#fff',
  },
  disabled: {
    opacity: 0.2,
  },
});
