import React, { Component } from 'react';
import { View, Button } from 'react-native';

export default class MenuScreen extends Component {
    static navigationOptions = {
        title: 'Tic Tac Toe',
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Button
                    title="Local Game"
                    onPress={() => navigate('Game', { online: false, })}
                />
                <Button
                    title="Online Game"
                    onPress={() => navigate('Game', { online: true, })}
                />
            </View>
        )
    }
}