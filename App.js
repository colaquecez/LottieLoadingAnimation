import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import LottieView from 'lottie-react-native';
import {Animated, Easing} from 'react-native';

const App = () => {
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const ChangeLoadingToSuccess = () => {
    setLoading(false);
    setSuccess(true);
    setError(false);
  };

  const ChangeSuccessToLoading = () => {
    setLoading(true);
    setSuccess(false);
    setError(false);
  };

  const ChangeToError = () => {
    setLoading(false);
    setSuccess(false);
    setError(true);
  };

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  }, [progress]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View style={{backgroundColor: 'grey', flexDirection: 'row'}}>
        <TouchableOpacity
          style={{padding: 30, backgroundColor: 'black'}}
          onPress={ChangeLoadingToSuccess}>
          <Text style={{color: 'white'}}>Success</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{padding: 30, backgroundColor: 'black'}}
          onPress={ChangeSuccessToLoading}>
          <Text style={{color: 'white'}}>Loading</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{padding: 30, backgroundColor: 'black'}}
          onPress={ChangeToError}>
          <Text style={{color: 'white'}}>Error</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 1}}>
        {loading && (
          <LottieView source={require('./loading.json')} loop autoPlay />
        )}

        {success && (
          <LottieView
            source={require('./success.json')}
            onAnimationFinish={() => {
              Alert.alert('Proximo Passo');
            }}
            autoPlay
            loop={false}
          />
        )}

        {error && <LottieView source={require('./error.json')} loop autoPlay />}
      </View>
    </SafeAreaView>
  );
};

export default App;
