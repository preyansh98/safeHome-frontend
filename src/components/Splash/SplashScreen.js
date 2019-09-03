import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { Button } from 'native-base';

const { width, height } = Dimensions.get('screen');
export default class SplashScreen extends Component {

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <Text style={{color: 'white', fontSize:40, position:"absolute", top:height/3, left:width/4}}>WAIT FOR IT</Text>
                <Image
                    style={{ marginTop: 50, width: width * 0.9, height: height * 0.8, justifyContent: 'center', alignContent: 'center', alignSelf: 'center', }}
                    source={{ uri: 'https://media.giphy.com/media/2cdYfc9hMr9df6dS2s/giphy.gif' }}
                />
                <Button full danger onPress={()=>this.props.navigation.navigate('Register')}><Text>Begin</Text></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    imageContainer: {
        width: '80%',
        height: '40%',
        alignSelf: 'center',
        marginTop: 40
    },
    textStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 10,
    },
    buttons: {
        backgroundColor: 'rgba(230, 230, 230,1)',
        height: 40,
        marginTop: 40,
        width: 250,
        height: 40,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: '#121212'
    },
});
