import * as Device from "expo-device";
import React, { Component, createRef } from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { sha256 } from "../../crypto/crypto";
import { loadPasskey, storePasskey } from "../../database/database-helper";
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
    this.passcode.current.addDigit(digit, (passcode, onError) => {
      const passkey = sha256(passcode + Device.uniqueId);
      if (this.forSetup) {
        storePasskey(passkey, (err) => {
          if (!err) {
            Toast.show({
              type: "success",
              text1: "Passcode stored securely.",
              text2: "Welcome to your Password Manager 👋",
              visibilityTime: 2000,
            });
            this.props.navigation.replace("HomeScreen", { passkey: passkey });
          }
        });
      } else {
        loadPasskey((err, res) => {
          if (!err && res) {
            if (passkey === res) {
              Toast.show({
                type: "success",
                text1: "Logged in successfully",
                visibilityTime: 1500,
              });
              this.props.navigation.replace("HomeScreen", { passkey: passkey });
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
