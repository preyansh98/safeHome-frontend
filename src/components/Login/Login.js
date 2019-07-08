import React, {Component} from 'React';
import {StyleSheet, View, Text} from 'react-native'; 

export default class Login extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text backgroundColor='green'>temp</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#3498db'
    }
});