import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { login, userLogin } from '../actions';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("")
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("")
    const myState = useSelector((state) =>
        state.userLogin)
    const dispatch = useDispatch();



    const login = async () => {
        await axios.post('https://react-native-server1.herokuapp.com/user/login', {
            email: email,
            password: password
        }).then(res => {
            console.log(res.data.msg)
            AsyncStorage.setItem('token', res.data.token)
            dispatch({ type: 'LOGIN', payload: res.data.token })
        }).catch(e => console.log(e));
        var emailValid = false;
        if (email.length == 0) {
            setEmailError("Email is required");
        }
        else if (email.length < 6) {
            setEmailError("Email should be minimum 6 characters");
        }
        else if (email.indexOf(' ') >= 0) {
            setEmailError('Email cannot contain spaces');
        }
        else if (email.trim().includes("@") == false) {
            setEmailError('Email contains @ in it')
        }
        else if (email.trim().includes(".") == false) {
            setEmailError('Email contains .(dot) in it')
        }
        else {
            setEmailError("")
            emailValid = true
        }

        var passwordValid = false;
        if (password.length == 0) {
            setPasswordError("Password is required");
        }
        else if (password.length < 6) {
            setPasswordError("Password should be minimum 6 characters");
        }
        else if (password.indexOf(' ') >= 0) {
            setPasswordError('Password cannot contain spaces');
        }
        else {
            setPasswordError("")
            passwordValid = true
        }

        if (emailValid && passwordValid) {

        }

    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../assets/OLX.jpg")} />

            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email."
                    value={email}
                    placeholderTextColor="#003f5c"
                    onChangeText={(e) => setEmail(e)}
                    autoCapitalize='none' keyboardType='email-address' autoComplete='email'
                />
            </View>
            <View style={{ right: 40, bottom: 20 }}>
                {emailError.length > 0 &&
                    <Text style={{ color: 'red' }}>{emailError}</Text>
                }
            </View>


            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    value={password}
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(e) => setPassword(e)}
                />
            </View>

            <View style={{ right: 40, bottom: 20 }}>
                {passwordError.length > 0 &&
                    <Text style={{ color: 'red' }}>{passwordError}</Text>
                }
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={login} >
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <View style={styles.accountStyle}>
                <Text style={styles.forgot_button} >Don't have an account ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')} >
                    <Text style={styles.forgot_button}>Signup</Text>
                </TouchableOpacity>


            </View>
            <TouchableOpacity onPress={() => navigation.navigate("ForgetScreen")}>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        marginBottom: 40,
        height: 40,
        width: 40
    },

    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,

        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,

        width: '100%',
        textAlign: 'center'
    },

    forgot_button: {
        height: 30,
        marginBottom: 10,
    },

    loginBtn: {
        width: "70%",
        borderRadius: 25,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
    },
    loginText: {
        color: 'white'
    },
    accountStyle: {
        flexDirection: 'row',
        paddingTop: 20
    }
});
export default LoginScreen;