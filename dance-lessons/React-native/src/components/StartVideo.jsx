import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import AppAudio from './Audio';
import Timer from './Timer';
import Result from './Result';
import AppLoader from '../components/AppLoader';

const READY_TIME = 5000;
const PRACTICE_TIME = 5000;

const StartVideo = ({ lesson, goBack }) => {
  const [isReadyVideo, setReadyVideo] = React.useState(false);
  const [isReadyAudio, setReadyAudio] = React.useState(false);
  const [isReady, setReady] = React.useState(false);
  const [showResult, setShowResult] = React.useState(false);
  const windowWidth = Dimensions.get('window').width;

  React.useEffect(() => {
    //после загрузки видео запускает обратный отчет по итогу ставит общий флаг ready
    if (isReadyVideo) {
      const timerReady = setTimeout(() => {
        setReady(true);
      }, READY_TIME);

      return () => clearTimeout(timerReady);
    }
  }, [isReadyVideo]);

  return (
    <ScrollView>
      {!isReadyVideo && ( // загрузка видео
        <View style={styles.center}>
          <AppLoader />
        </View>
      )}

      {isReadyVideo &&
        !isReady && ( //первый таймер обратный отчет
          <View>
            <Timer time={READY_TIME / 1000} />
            <Text
              style={{
                marginTop: 20,
                fontSize: 18,
                textAlign: 'center',
                color: 'grey',
              }}
            >
              Начинаем тренировку! Повторяй за тренером
            </Text>
            {/* <Text>{lesson.title}</Text> */}
          </View>
        )}

      {isReady && ( // основной таймер сетит по окончании показ результатов
        <View>
          <Timer time={60} handler={setShowResult} />
        </View>
      )}

      {!showResult && ( // видео показывается в начале, далеее на показе результатов скрывается
        <Video
          source={{ uri: lesson.practiceUrl }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          shouldPlay={isReady}
          isLooping
          onReadyForDisplay={() => setReadyVideo(true)}
          style={{ width: windowWidth - 2 * 30, height: windowWidth }}
        />
      )}

      {
        isReady && !showResult && <AppAudio onReady={setReadyAudio} /> // играет аудио по готовности
      }
      {showResult && <Result goBack={goBack} lessonId={lesson.id} />}
    </ScrollView>
  );
};

export default StartVideo;

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
});
