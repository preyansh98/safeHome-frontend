import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const SplashScreen = () => {
    return(
        <View style={styles.container}>
            <Image 
                style={styles.imageContainer}
                source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
            />
            <Text style={styles.textStyle}>Welcome to SafeHome!</Text>

            <TouchableOpacity style={styles.buttons}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>    

            <TouchableOpacity style={styles.buttons}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>    
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor:'white',
        alignItems:'center',
    },
    imageContainer:{
        width:'80%', 
        height:'40%', 
        alignSelf:'center', 
        marginTop:40
    },
    textStyle:{
        fontSize:30,
        fontWeight:'bold',
        marginTop:30,
        marginBottom:10,
    },
    buttons:{
        backgroundColor:'rgba(230, 230, 230,1)',
        height:40,
        marginTop:40,
        width:250,
        height:40,
        justifyContent:'center'
    },
    buttonText:{
        fontSize:18,
        color:'#121212'
    },
});

export default SplashScreen;