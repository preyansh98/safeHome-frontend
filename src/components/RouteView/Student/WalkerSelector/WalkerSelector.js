import React, {Component} from 'react'; 
import {Text, View } from 'react-native'; 
import WalkerRow from './WalkerRow'; 
import config from '../../../../config/config';
import { Button } from 'native-base';

export default class WalkerSelector extends Component{
    constructor(props){
        super(props);
    }

    async componentDidMount(){
        let walkers = await this.getPotentialWalkers();
        this.setState({potential_walkers : walkers});
    }

    async getPotentialWalkers(){
        let response = await fetch(config.backendUrls.viewWalkerAPI + "/" + global.mcgill_id);
                
        if(response.status >= 200 && response.status <= 300){
            let resJson = await response.json(); 
            return resJson;
        } else
            return []; 
    }

    state = {
        mcgillId: '',
        potential_walkers: [],
        selectedWalkerId: '', 
    }

    selectedWalker = (id) => {
        this.setState({selectedWalkerId : id});
    }

    render(){
        return(
            <View>
                {this.state.potential_walkers && 
                    this.state.potential_walkers.map((walker, idx) => (
                    <WalkerRow
                        key = {idx}
                        walkerId = {walker.walkerid}
                        walkerIsWalksafe = {walker.walksafe}
                        walkerRating = {walker.rating}
                        onClickWalker = {this.selectedWalker}
                    />  
                ))}
                <Button><Text>CONFIRM</Text></Button>
            </View>
        ); 
    }
}