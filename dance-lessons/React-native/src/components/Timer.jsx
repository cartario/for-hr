import React from 'react';
import {Text} from 'react-native'

const Timer = ({ time, handler }) => {
  const [count, setCount] = React.useState(time);

  React.useEffect(() => {
    const addTimer = setInterval(() => {
      setCount((prev) => {
        if (prev === 0) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const timer = count > 0 && addTimer;

    handler && count===0 &&handler(true);

    return () => clearInterval(timer);
  }, [count]);

  return <Text style={{fontSize: 50, textAlign: 'center', fontWeight: 'bold'}}>{`00:${count < 10 ? `0${count}` : count}`}</Text>;
};

export default Timer;
