import React, {Component} from 'react';
import { Container, Header,Content, Item, Icon, Input } from 'native-base';

export default class LocationView extends Component{
    constructor(props){
        super(props);
    }

    state={

    }

    render(){
        return(
            <Container>
            <Header />
            <Content>
              <Item>
                <Input placeholder="Enter your pickup address" onTouchStart={()=>this.props.navigation.navigate('LocationEntry')}/>
                <Icon style = {{marginRight: 10, color: "blue"}} active name = "paper-plane"/>
              </Item>
              <Item>
                <Input placeholder="Enter your destination address" />
              </Item>
            </Content>
          </Container>
        ); 
    }
}