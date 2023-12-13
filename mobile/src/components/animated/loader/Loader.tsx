import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export function Loader() {
  const animation = useRef(null);
  //   useEffect(() => {
  //     // You can control the ref programmatically, rather than using autoPlay
  //     // animation.current?.play();
  //   }, []);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 24,
          height: 24,
          backgroundColor: 'transparent',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        // eslint-disable-next-line global-require
        source={require('src/assets/lottie/animation-loader.json')}
      />
    </View>
  );
}
