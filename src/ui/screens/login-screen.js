import React, { Component, createRef } from "react";
import { Image, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import uuid from "react-native-uuid";
import { sha256 } from "../../crypto/crypto";
import { loadPasskey, loadUuid, storePasskey, storeUuid } from "../../database/database-helper";
import Numpad from "../components/numpad";
import Passcode from "../components/passcode";
import { IMAGES } from "../../global/constants";

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
      if (this.forSetup) {
        const uuidV4 = uuid.v4();
        storeUuid(uuidV4, (err) => {
          if (!err) {
            const passkey = sha256(passcode + uuidV4);
            storePasskey(passkey, (err2) => {
              if (!err2) {
                Toast.show({
                  type: "success",
                  text1: "Passcode stored securely.",
                  text2: "Welcome to your Password Manager 👋",
                  visibilityTime: 3000,
                });
                this.props.navigation.replace("HomeScreen", { passkey: passkey });
              }
            });
          }
        });
      } else {
        loadUuid((err, res) => {
          if (!err && res) {
            const passkey = sha256(passcode + res);
            loadPasskey((err2, res2) => {
              if (!err2 && res2) {
                if (passkey === res2) {
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
        })
      }
    });
  }

  handleClearPressed() {
    this.passcode.current.clearDigits();
  }

  handleBiometricsSuccess() {
    loadPasskey((err, res) => {
      if (!err && res) {
        Toast.show({
          type: "success",
          text1: "Logged in successfully",
          visibilityTime: 1500,
        });
        this.props.navigation.replace("HomeScreen", { passkey: res });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={IMAGES.logoVertical} resizeMode="contain" style={styles.logo} />
        <Passcode ref={this.passcode}></Passcode>
        <Numpad
          forSetup={this.forSetup}
          onDigitPressed={(digit) => this.handleDigitPressed(digit)}
          onClearPressed={() => this.handleClearPressed()}
          onBiometricsSuccess={() => this.handleBiometricsSuccess()}
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
    justifyContent: "space-evenly",
  },
  logo: {
    height: 70,
    alignSelf: "center",
  },
});

export default LoginScreen;
