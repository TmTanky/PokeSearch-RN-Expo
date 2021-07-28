import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading';

// Navigators
import MainNavigator from './navigation/mainNavigator';

const App = () => {

  const [loaded] = useFonts({
    MonsReg: require('./assets/fonts/Montserrat-Regular.ttf'),
    MonsBold: require('./assets/fonts/Montserrat-Bold.ttf')
  })

  if (!loaded) {
    return <AppLoading/>
  }

  return (
    <NavigationContainer>
      <MainNavigator/>
    </NavigationContainer>
  )

}

export default App

