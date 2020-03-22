import React, {Component} from 'react'; 
import {Text, View } from 'react-native'; 
import WalkerRow from './WalkerRow'; 
import config from '../../../../config/config';

export default class WalkerSelector extends Component{
    constructor(props){
        super(props);
    }

    async componentDidMount() {
        let walkers = await this.getPotentialWalkers(); 
        this.setState({potential_walkers : walkers}); 
    }

    async getPotentialWalkers(){
        let response = await fetch(config.backendUrls.viewWalkerAPI + "/" + global.mcgill_id);
        let resJson = response.json(); 
        
        if(resJson.status >= 200 && resJson.status <= 300){
            this.setState({potential_walkers: resJson});
        } 
    }

    state = {
        mcgillId: '',
        potential_walkers: []
    }

    render(){
        return(
            //make a design for the table, in which the rows will go.
            <View>
                {this.state.potential_walkers &&
                 this.state.potential_walkers.forEach(walker => {
                    <WalkerRow
                    walker_id = {"random id"}
                    walker_name = {"no names"}
                    walker_rating = {walker.rating}
                    />  
                })
                }
            </View>
        ); 
    }
}