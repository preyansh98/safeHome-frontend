import React, {Component} from 'React';
import {StyleSheet, View, TextInput,Text} from 'react-native';

export default class LoginForm extends Component{
    constructor(props){
        super(props);

        this.state={
            'mcgillid':'',
            'loginAs':'',
        };
    };

    render(){
        return(
            <View style={styles.container}>
                <Text>McGill ID: </Text>
                <TextInput style={styles.input}
                placeholder="text"
                returnKeyType="next"
                placeholderTextColor="black"
                onChangeText={text=>this.setState({mcgillid:text})}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: .9, //to account for header bar.
        flexDirection:'row',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
      },
      input:{
        height:40,
        width: 180,
        padding:10,
        margin: 15,
        borderColor: '#7a42f4',
        borderWidth: 1
      },
});