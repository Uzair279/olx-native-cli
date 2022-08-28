import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button } from 'react-native'
import React, { useState, } from 'react'
import { StatusBar } from 'react-native';

const ConfirmEmail = ({navigation}) => {
    const [otp, setOtp] = useState("");

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../assets/OLX.jpg")} />

            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Enter OTP."
                    value={otp}
                    placeholderTextColor="#003f5c"
                    onChangeText={(e) => setOtp(e)}
                />
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate("LoginScreen")}>
                <Text style={styles.loginText}>REGISTER</Text>
            </TouchableOpacity>
            <View style={styles.accountStyle}>
                <Text style={styles.forgot_button} >Send OTP Again ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("ForgetScreen")}>
                    <Text style={styles.forgot_button}>OTP</Text>
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
export default ConfirmEmail;