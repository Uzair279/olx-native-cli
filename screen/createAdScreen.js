import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { launchImageLibrary } from 'react-native-image-picker';
const CreateAdScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [des, setDes] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const [phone, setPhone] = useState('');
    const [uid, setUid] = useState('')
    const [images, setImages] = useState('');
    const [progress, setProgress] = useState(false);
    const [pickerResponse, setPickerResponse] = useState(null);
  
  const openGalery = () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, setPickerResponse);
  };
  
  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;
    return (
        <ScrollView>
            <View style={styles.container}>
                <Image style={styles.image} source={require("../assets/OLX.jpg")} />

                <StatusBar style="auto" />


                <View style={styles.textView}>
                    <Text style={styles.textColor}>Title</Text>
                </View>
                <View style={styles.inputView}>

                    <TextInput
                        value={name}
                        style={styles.TextInput}
                        placeholder='Title of your product'
                        placeholderTextColor="grey"
                        onChangeText={(text) => setName(text)}
                    />
                </View>

                <View style={styles.textView}>
                    <Text style={styles.textColor} >Description</Text>
                </View>
                <View style={[styles.inputView, { height: 90 }]}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Write Description"
                        value={des}
                        multiline
                        numberOfLines={3}
                        Outlined='focused'
                        placeholderTextColor="grey"
                        onChangeText={(text) => setDes(text)}
                    />
                </View>
                <View style={styles.textView}>
                    <Text style={styles.textColor} >Year</Text>
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        value={year}
                        placeholder="Purchasing year"
                        placeholderTextColor="grey"
                        keyboardType='numeric'
                        onChangeText={(text) => setYear(text)}
                    />
                </View>
                <View style={styles.textView}>
                    <Text style={styles.textColor}>Price</Text>
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        value={price}
                        placeholder="Price"
                        placeholderTextColor="grey"
                        keyboardType='numeric'
                        onChangeText={(text) => setPrice(text)}
                    />
                </View>
                <View style={styles.textView}>
                    <Text style={styles.textColor} >Phone Number</Text>
                </View>

                <View style={styles.inputView}>

                    <TextInput
                        style={styles.TextInput}
                        value={phone}
                        placeholder="Phone Number"
                        placeholderTextColor="grey"
                        keyboardType='numeric'
                        onChangeText={(text) => setPhone(text)}
                    />
                </View>



                <TouchableOpacity style={styles.loginBtn} onPress={() => openGalery()}>
                    <Text style={styles.loginText}>Upload Image</Text>
                </TouchableOpacity>
                {
        uri && (
          <Image source={{uri}} style=
            {{height:200, width:200,margin:20}}>
          </Image>
        )
      }
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.loginText}>Post</Text>
                </TouchableOpacity>

            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10

    },
    textView: {

        alignSelf: 'flex-start',
        paddingLeft: 22
    },
    textColor: {
        color: 'black'
    },
    image: {
        marginBottom: 10,
        height: 40,
        width: 40,
        marginTop: 10
    },

    inputView: {
        backgroundColor: "white",
        borderRadius: 5,
        width: "90%",
        height: 45,
        marginBottom: 20,
        borderWidth: 1,



    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,

        width: '100%',

    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
    },

    loginBtn: {
        width: "90%",
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
    accountStyle: {
        flexDirection: 'row',
        paddingTop: 20
    }
});
export default CreateAdScreen;