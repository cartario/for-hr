import React from 'react';
import { View, Text, StyleSheet , Dimensions} from 'react-native';
import { Video } from 'expo-av';
import AppLoader from '../components/AppLoader';

const Tutorial = ({ lesson }) => {
  const [isReadyVideo, setReadyVideo] = React.useState(false);
  const windowWidth = Dimensions.get('window').width;
  return (
    <View>
      
      {!isReadyVideo && ( // загрузка видео
        <View style={styles.center}>
          <AppLoader />
        </View>
      )}

      <Video
        source={{ uri: lesson.tutorialUrl }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="contain"
        shouldPlay
        isLooping
        onReadyForDisplay={() => setReadyVideo(true)}
        style={{ width: windowWidth-2*30, height: windowWidth }}
      />
    </View>
  );
};

export default Tutorial;

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
});
