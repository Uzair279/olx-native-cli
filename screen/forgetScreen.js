import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'react-native';
import axios from 'axios';
const ForgetScreen = ({ navigation }) => {
    const [forget, setForget] = useState("");
    const [emailError, setEmailError] = useState("")

    const forgetscreen = async () => {

        await axios.post('https://react-native-server1.herokuapp.com/user/forgot-password', {
            email: forget
        }).then(res => {
            console.log(res.data.msg)
            navigation.navigate('LoginScreen')
        }).catch(e => console.log(e));

       
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../assets/OLX.jpg")} />

            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email."
                    value={forget}
                    placeholderTextColor="#003f5c"
                    onChangeText={(e) => setForget(e)}
                    autoCapitalize='none'
                    keyboardType='email-address' autoComplete='email'
                />
            </View>
            <View style={{ right: 40, bottom: 20 }}>
                {emailError.length > 0 &&
                    <Text style={{ color: 'red' }}>{emailError}</Text>
                }
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={forgetscreen}>
                <Text style={styles.loginText}>SEND OTP</Text>
            </TouchableOpacity>
            <View style={styles.accountStyle}>
                <Text style={styles.forgot_button} >Don't have account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
                    <Text style={styles.forgot_button}>Signup</Text>
                </TouchableOpacity>
            </View>

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
export default ForgetScreen;