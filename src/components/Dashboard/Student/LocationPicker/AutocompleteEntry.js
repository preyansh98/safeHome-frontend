import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';
import { List, Header, Container, Content, ListItem } from 'native-base';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';

const { width, height } = Dimensions.get('screen');

export default class AutocompleteEntry extends Component {

    constructor(props) {
        super(props);
    }

    state = {}

    render() {
        return (
            <View styles={{flex:1}}>
                <GoogleAutoComplete apiKey="AIzaSyBBgb9w4vEBeX9zSoLOBC2hB7omCHBi5SU" >
                    {({}) => (
                        <React.Fragment>
                            <View>
                                <Text>
                                    <TextInput placeholder="search"></TextInput>
                                </Text>
                            </View>
                        </React.Fragment>
                    )}
                </GoogleAutoComplete>
            </View>
        );
    }
}