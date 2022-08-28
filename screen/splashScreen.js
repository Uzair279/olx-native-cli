import { StyleSheet,View, Image,} from 'react-native'
import React, { useEffect, useState } from 'react'
import LoginScreen from './loginScreen';
const SplashScreen = ({navigation}) => {
    const [Login, setLogin] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setLogin(true)
        }, 3000);
    }, [])
    if (Login) {
        return <LoginScreen />
    }
    return (
        <View style={styles.container}>
            <Image source={require('../assets/OLX.jpg')}
                style={styles.imageStyle}>

            </Image>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    imageStyle: {
        width: 180,
        height: 180

    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
})