import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

export default class GameScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            board: [[], [], []],
            turn: 'O',
            score: [0, 0, 0, 0, 0, 0, 0, 0, 0],   // Used to calculate a winner, operates in O(n) time and space
            winner: undefined,
        }
        console.log(this.props.navigation.getParam('online'));
    }

    _getWinner(newScore) {
        for (let i = 0; i < newScore.length; i++) {
            let curScore = newScore[i];
            if (curScore === 3) {
                return 'X';
            }

            if (curScore === -3) {
                return 'O';
            }
        }
    }

    _onPressButton(i, j) {
        if (!this.state.board[i][j] && !this.state.winner) {
            this.setState(prevState => {
                let curTurn = prevState.turn;
                let nextTurn = curTurn === 'O' ? 'X' : 'O';
                let point = curTurn === 'O' ? -1 : 1;

                let newBoard = [...prevState.board];
                let newScore = [...prevState.score];

                newBoard[i][j] = curTurn;
                newScore[i] += point;
                newScore[3 + j] += point;
                if (i == j) newScore[2 * 3] += point;
                if (3 - 1 - j == i) newScore[2 * 3 + 1] += point;


                return {
                    board: newBoard,
                    turn: nextTurn,
                    score: newScore,
                    winner: this._getWinner(newScore),
                }
            })
        }
    }

    _renderBoard() {
        let renderedBoard = [];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let board = this.state.board;
                let curLetter = board[i][j] ? board[i][j] : '';

                renderedBoard.push(
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._onPressButton(i, j)}
                    >
                        <Text> {curLetter} </Text>
                    </TouchableOpacity>
                )
            }
        }
        return renderedBoard;
    }

    _renderWinner() {
        let winner = this.state.winner;
        let winnerMessage = winner ? winner + " has won!" : '';

        return (
            <Text style={winnerMessage}>{winnerMessage}</Text>
        );
    }

    render() {
        const { navigate } = this.props.navigation;
        if (this.state.winner) {
            return (
                <View style={styles.container}>
                    <Button
                        title="Back"
                        onPress={() => navigate('Menu', {})}
                    />
                    {this._renderWinner()}
                </View>
            )
        }
        return (
            <View style={styles.container}>
                {this._renderBoard()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        // padding: 10,
        margin: 10,
        width: '25%',
        height: '30%',
        // flexBasis: '33%',
    },
    winnerMessage: {
        position: 'absolute',
    }
});