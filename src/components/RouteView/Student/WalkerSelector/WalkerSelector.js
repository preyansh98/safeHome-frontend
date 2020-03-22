import {React, Component} from 'react'; 
import {Text, View, StyleSheet} from 'react-native'; 
import WalkerRow from './WalkerRow'; 
import config from '../../../../config/config';

export default class WalkerSelector extends Component{
    constructor(props){
        super(props);

        this.state={
            potential_walkers: ""
        }
        let potential_walkers = loadWalkers();
    }

    render(){
        return(
            //make a design for the table, in which the rows will go.
            <View>
                {potential_walkers.array.forEach(element => {
                    <WalkerRow
                    walker_id = {element}
                    walker_name = {element}
                    walker_rating = {element}
                    />  
                })
                }
            </View>
        ); 
    }
}

async function loadWalkers(){
    var data ={
        mcgillID:this.state.mcgillid, 
      };
      try {
        let response = await fetch(config.backendUrls.viewWalkerAPI);
        if (response.status >= 200 && response.status < 300) {
          let responseJson = response.json;
          return responseJson; 
        }
        else{
          alert("Unsuccesful" + response.status);
        }
      } catch (errors) {
        alert(errors);
       } 
    return "error"; 
}

