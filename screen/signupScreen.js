import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'react-native';
import { userSignup } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
const SignupScreen = ({ navigation }) => {
    const myState = useSelector((state) => state.userSignup)
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [nameError, setNameError] = useState('')
    const signup = async () => {
        await axios.post('https://react-native-server1.herokuapp.com/user/register', {
            fullName: name,
            email: email,
            password: password
        }).then(res => {
            console.log(res.data.msg)
            navigation.navigate('Otpscreen')

        }).catch(e => console.log(e));

        var nameValid = false;
        if (name == 0) {
            setNameError("Name cannot be Null")
        }
        else if (name.length < 6) {
            setNameError("Name should be minimum 6 characters");
        }
        else {
            setNameError("")
            nameValid = true
        }
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

        if (emailValid && passwordValid && nameValid) {

        }
    }



    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../assets/OLX.jpg")} />

            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Full Name."
                    value={name}
                    placeholderTextColor="#003f5c"
                    onChangeText={(e) => setName(e)}
                />
            </View>

            <View style={{ right: 40, bottom: 20 }}>
                {nameError.length > 0 &&
                    <Text style={{ color: 'red' }}>{nameError}</Text>
                }
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email."
                    value={email}
                    placeholderTextColor="#003f5c"
                    onChangeText={(e) => setEmail(e)}
                    autoCapitalize='none'
                    keyboardType='email-address' autoComplete='email'
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
                    placeholder="Confirm Password."
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



            <TouchableOpacity style={styles.loginBtn} onPress={signup}>
                <Text style={styles.loginText}>SIGNUP</Text>
            </TouchableOpacity>
            <View style={styles.accountStyle}>
                <Text style={styles.forgot_button} >Already have an account ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                    <Text style={styles.forgot_button}>Login</Text>
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
        marginBottom: 30,
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
export default SignupScreen;