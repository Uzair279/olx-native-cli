import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { StatusBar } from 'react-native';
const Otpscreen = ({ navigation }) => {
    const [otp, setOtp] = useState("");
    const otpConfirm = async () => {
        await axios.post('https://react-native-server1.herokuapp.com/user/account-verify', {
            otp: otp,
        }).then(res => {
            console.log(res.data)
            navigation.navigate('LoginScreen')
        }).catch(e => console.log(e))
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../assets/OLX.jpg")} />

            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="OTP."
                    placeholderTextColor="#003f5c"
                    value={otp}
                    onChangeText={(e) => setOtp(e)}
                    keyboardType='number-pad'
                />
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={otpConfirm}>
                <Text style={styles.loginText}>Confirm OTP</Text>
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
export default Otpscreen;