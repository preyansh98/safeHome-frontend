import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import WalkerRow from './WalkerRow';
import config from '../../../../config/config';
import { List, Button } from 'native-base';

export default class WalkerSelector extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        let walkers = await this.getPotentialWalkers();
        this.setState({ potential_walkers: walkers });
    }

    async getPotentialWalkers() {
        let response = await fetch(config.backendUrls.viewWalkerAPI + "/" + global.mcgill_id);
        if (response.status >= 200 && response.status <= 300) {
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

    render() {
        return (
            <View>
                <Text style={styles.selectWalker}>Select a Walker:</Text>
                <ScrollView style={{ marginRight: '5%', height: '70%' }} alwaysBounceVertical>
                    <List selected>
                        {this.state.potential_walkers &&
                            this.state.potential_walkers.map((walker, idx) => (
                                <WalkerRow
                                    key={idx}
                                    walkerId={walker.walkerid}
                                    walkerIsWalksafe={walker.walksafe}
                                    walkerRating={walker.rating}
                                    onClickWalker={(id) => this.setState({ selectedWalkerId: id })}
                                    getBackgroundColor={(id) => id === this.state.selectedWalkerId ? "#add8e6" : "white"}
                                />
                            ))}
                    </List>
                </ScrollView>
                <Button block iconRight dark style={styles.confirmButton}
                    onPress={() => this.props.createRequest(this.state.selectedWalkerId)}>
                    <Text style={{ color: "white" }}>Confirm</Text>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    selectWalker: { marginTop: '1%', textAlign: "center", textAlignVertical: "center" },
    confirmButton: {
        marginLeft: '5%',
        marginRight: '5%'
    }
})