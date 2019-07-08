import React, {Component} from 'React';
import {StyleSheet, View, TextInput} from 'react-native';

export default class LoginForm extends Component{
    render(){
        return(
            <View style = {styles.container}>
                <TextInput
                    placeholder="McGill ID:"
                    placeholderTextColor="black"
                    style={styles.input}
                />

                <TextInput
                    placeholder="Student/Walker:"
                    placeholderTextColor="black"
                    style={styles.input}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#3498db'
    },
    input:{
        height:40,
        backgroundColor:'white',
        marginBottom:20,
        color:'black',
        paddingHorizontal:10
    }
});