import { StyleSheet, Text, View, SafeAreaView, Image, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import SplashScreen from './screen/splashScreen'
import LoginScreen from './screen/loginScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgetScreen from './screen/forgetScreen';
import SignupScreen from './screen/signupScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import CreateAdScreen from './screen/createAdScreen';
import AccountScreen from './screen/accountScreen';
import Ads from './screen/ads';
import ConfirmEmail from './screen/confirmEmail';
import store from './store';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import Otpscreen from './screen/otpscreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigator = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="ForgetScreen" component={ForgetScreen} />
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
      <Stack.Screen name="Otpscreen" component={Otpscreen} />
    </Stack.Navigator>
  )
}
const TabNavigator = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'CreateAdScreen') {
            iconName = 'plus-circle'
          } else if (route.name === 'Ads') {
            iconName = 'home'
          }
          else if (route.name === 'AccountScreen') {
            iconName = 'user'
          }
          return <View style={styles.iconStyle}><Feather name={iconName} size={35} color={color} /></View>
        },
        headerShown: true,
        tabBarActiveTintColor: 'deepskyblue',
        tabBarInactiveTintColor: 'gray',
        headerTitleAlign: 'center',
        showIcon: true
      })}


    >


      <Tab.Screen name="CreateAdScreen" component={CreateAdScreen} options={{ title: 'Create Ad' }} />
      <Tab.Screen name="Ads" component={Ads} options={{ title: 'Ads' }} />
      <Tab.Screen name="AccountScreen" component={AccountScreen} options={{ title: 'Account' }} />
    </Tab.Navigator>
  )
}
const Navigation = () => {
  const [myToken, setmyToken] = useState(null)
 
  const { token } = useSelector((state) =>
    state.authReducer)
  console.log("first token", token)
  
  return (
    <NavigationContainer>
      {token ? <TabNavigator /> : <StackNavigator />}

    </NavigationContainer>
  )
}

const App = () => {


  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>

        <Navigation />

      </SafeAreaView>
    </Provider>

  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',


  },
  imageStyle: {
    width: 180,
    height: 180

  },
  iconStyle: {
    alignSelf: 'center',
  }
})