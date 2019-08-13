import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: {},
      turn: 'o',
      winner: undefined,
    }
  }

  _onPressButton(loc) {
    if (!this.state.board[loc] && !this.state.winner) {
      this.setState(prevState => {
        let curTurn = prevState.turn;
        let nextTurn = curTurn === 'o' ? 'x' : 'o';
        let newBoard = { ...prevState.board };

        newBoard[loc] = curTurn;

        return {
          board: newBoard,
          turn: nextTurn,
        }
      })
    }
  }

  _renderBoard() {
    let renderedBoard = [];

    for (let i = 0; i < 9; i++) {
      let board = this.state.board;
      let curShape = board[i] ? board[i] : '';

      renderedBoard.push(
        <TouchableOpacity
          style={styles.button}
          onPress={() => this._onPressButton(i)}
        >
          <Text> {curShape} </Text>
        </TouchableOpacity>
      )
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

    return (
      <View style={styles.container}>
        {this._renderBoard()}
        {this._renderWinner()}
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
