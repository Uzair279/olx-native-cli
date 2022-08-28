import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { userLogout } from '../actions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux'
const AccountScreen = ({ navigation }) => {
  const myState = useSelector((state) =>
    state.userLogout)
  const dispatch = useDispatch();
  const logout = async () => {
    AsyncStorage.removeItem('token')


    dispatch({ type: "LOGOUT" })
  }

  return (
    <View style={styles.container}>
      <EvilIcons name='user' size={80} />
      <Text style={styles.text}>Logout from this Device</Text>
      <TouchableOpacity style={styles.loginBtn} onPress={logout}>
        <Text style={styles.loginText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AccountScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginBtn: {
    width: "50%",
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#a9b900",
  },
  loginText: {
    color: 'white'
  },
  text: {
    color: 'black',
    fontWeight: '600'
  }
})



