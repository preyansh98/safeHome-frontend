import React, { Component } from 'react';
import { View } from 'react-native';
import { List, ListItem, Left, Body, Right, Thumbnail, Text, Icon } from 'native-base';
import config from '../../../../config/config';

export default class WalkerRow extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.setState({ walkerId: this.props.walkerId });
    this.setState({ walkerRating: this.props.walkerRating });
    this.setState({ isWalksafe: this.props.walkerIsWalksafe });
  }

  state = {
    walkerId: "",
    walkerRating: 0.0,
    isWalksafe: false,
  }

  render() {
    return (
      <ListItem avatar button
        onPress={(e) => {
          e.preventDefault();
          this.props.onClickWalker(this.state.walkerId)}}
        style={{ backgroundColor: this.props.getBackgroundColor(this.state.walkerId) }} >
        <Left>
          <Thumbnail source={{ uri: 'https://image.shutterstock.com/image-vector/person-icon-flat-symbol-design-260nw-424612276.jpg' }} />
        </Left>
        <Body>
          <Text>{this.state.walkerId}</Text>
          <Text note>Rating: {this.state.walkerRating}</Text>
        </Body>
        <Right>
          {this.state.isWalksafe &&
            (<Icon name='checkmark' style={{ fontSize: 36, color: 'green' }} />)}
        </Right>
      </ListItem>
    );
  }
}