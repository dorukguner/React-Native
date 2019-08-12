import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const operators = ['+', '-', '*', '/'];
const equals = '=';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      shouldClear: false,
    }
    this._onPressButton = this._onPressButton.bind(this);
  }

  _onPressButton(button) {
    let prevResult = this.state.result;
    if (button === equals) {
      this.setState(previousState => (
        {
          result: eval(previousState.result),
          shouldClear: true,
        }
      ))
    } else if (operators.includes(button) && prevResult.length > 1 && operators.includes(prevResult.substr(prevResult.length - 1))) {
      this.setState({
        result: prevResult.replace(/.$/, button),
      })
    } else {
      if (this.state.shouldClear) {
        this.setState({
          result: button,
          shouldClear: false,
        })
      } else {
        this.setState(previousState => (
          { result: previousState.result += button }
        ))
      }
    }
  }



  render() {
    buttons = [];
    nums.forEach((value) => {
      buttons.push(
        <TouchableOpacity
          style={styles.button}
          onPress={() => this._onPressButton(value)}
        >
          <Text> {value} </Text>
        </TouchableOpacity>
      );
    })

    operators.forEach((value) => {
      buttons.push(
        <TouchableOpacity
          style={styles.button}
          onPress={() => this._onPressButton(value)}
        >
          <Text> {value} </Text>
        </TouchableOpacity>
      );
    })

    buttons.push(
      <TouchableOpacity
        style={styles.button}
        onPress={() => this._onPressButton(equals)}
      >
        <Text> {equals} </Text>
      </TouchableOpacity>
    );


    return (
      <View style={styles.container}>
        <Text style={styles.result}>{this.state.result}</Text>
        <View style={styles.buttonsContainer}>
          {buttons}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  result: {
    width: '80%',
    height: '5%',
    textAlign: 'center',
    fontWeight: 'bold',
    borderColor: "black",
    borderWidth: 1,

  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "space-around",
    flexWrap: "wrap",
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
    width: 50,
    height: 50,
  },
});
