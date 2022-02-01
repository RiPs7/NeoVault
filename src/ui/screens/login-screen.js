import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component, createRef } from "react";
import { StyleSheet, View } from "react-native";
import { PASSWORD_HASH } from "../../global/constants";
import Numpad from "../components/numpad";
import Passcode from "../components/passcode";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.passcode = createRef();
    this.forSetup = props.route.params?.forSetup;
  }

  handleDigitPressed(digit) {
    const result = this.passcode.current.addDigit(digit);
    if (result) {
      if (this.forSetup) {
        AsyncStorage.setItem(PASSWORD_HASH, result);
      }
      // Replacing LoginScreen with HomeScreen, so that the user
      // cannot navigate back to it.
      this.props.navigation.replace("HomeScreen", { passcodeHash: result });
    }
  }

  handleClearPressed() {
    this.passcode.current.clearDigits();
  }

  render() {
    return (
      <View style={styles.container}>
        <Passcode ref={this.passcode}></Passcode>
        <Numpad
          onDigitPressed={(digit) => this.handleDigitPressed(digit)}
          onClearPressed={() => this.handleClearPressed()}
        ></Numpad>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
