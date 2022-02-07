import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import React, { Component, createRef } from "react";
import { StyleSheet, View } from "react-native";
import { sha256 } from "../../crypto/crypto";
import { PASSKEY_KEY } from "../../global/constants";
import Numpad from "../components/numpad";
import Passcode from "../components/passcode";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.passcode = createRef();
    // This may have been passed as a parameter,
    // so that the login screen is used for setup.
    this.forSetup = props.route.params?.forSetup;
  }

  handleDigitPressed(digit) {
    this.passcode.current.addDigit(digit, async (passcode, onError) => {
      const passkey = sha256(passcode + Device.uniqueId);
      if (this.forSetup) {
        AsyncStorage.setItem(PASSKEY_KEY, passkey, (err) => {
          if (!err) {
            this.props.navigation.replace("HomeScreen", { passkey });
          }
        });
      } else {
        AsyncStorage.getItem(PASSKEY_KEY, (err, result) => {
          if (!err && result) {
            if (passkey === result) {
              this.props.navigation.replace("HomeScreen", { passkey });
            } else {
              onError();
            }
          }
        });
      }
    });
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
