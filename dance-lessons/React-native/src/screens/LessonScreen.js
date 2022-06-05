import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import LessonModal from '../components/LessonModal';

const LessonScreen = ({navigation, route}) => {
  const id = route.params.lessonId;
    
  return (
    <View style={styles.center}>
      <View style={styles.wrap}>
        <View style={styles.common}>
          {/* <Text style={styles.text}>1.</Text> */}
          <LessonModal title='1.Watch tutorial movie' id={id}/>
        </View>
        <View style={styles.common}>
          {/* <Text style={styles.text}>2.</Text> */}          
          <LessonModal title='2.START' id={id} type='start' />
        </View>
        <View style={styles.common}>
          <Text style={styles.text}>3. Rate yourself and keep going</Text>        
        </View>
      </View>
    </View>)
};

export default LessonScreen;

const styles= StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,    
  },
  wrap: {
    justifyContent: 'space-between',
    // alignItems: 'flex-start',
    height: 200,    
  },
  common: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18
  }
})

