import React, { Component } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { sha256 } from "../../crypto/crypto";

class Passcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passcode: [],
    };
    this.shakeAnimation = new Animated.Value(0);
  }

  shakePasscode() {
    Animated.sequence([
      Animated.timing(this.shakeAnimation, { toValue: 5, duration: 100, useNativeDriver: true }),
      Animated.timing(this.shakeAnimation, { toValue: -5, duration: 100, useNativeDriver: true }),
      Animated.timing(this.shakeAnimation, { toValue: 5, duration: 100, useNativeDriver: true }),
      Animated.timing(this.shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();
  }

  addDigit(digit) {
    const newPasscode = this.state.passcode.concat(digit);
    this.setState({ passcode: newPasscode });
    if (newPasscode.length == 4) {
      return this.submitPasscode(newPasscode.join(""));
    }
    return null;
  }

  clearDigits() {
    this.setState({ passcode: [] });
  }

  submitPasscode(passcode) {
    const correctPasscode = "1234";
    const correctPasscodeHash = sha256(correctPasscode).toString();

    const passcodeHash = sha256(passcode).toString();

    if (passcodeHash === correctPasscodeHash) {
      return passcodeHash;
    } else {
      this.shakePasscode();
      this.clearDigits();
      return null;
    }
  }

  padPasscode(passcode) {
    return Array.from({ ...passcode, length: 4 });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>Passcode</Text>
        <Animated.View style={{ transform: [{ translateX: this.shakeAnimation }] }}>
          <View style={styles.passcodeContainer}>
            {this.padPasscode(this.state.passcode).map((elt, i) => (
              <View key={i} style={{ ...styles.passcode, ...(elt ? styles.enabled : styles.disabled) }} />
            ))}
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  passcodeContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  passcode: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "gray",
    width: 16,
    height: 16,
    margin: 16,
  },
  enabled: {
    backgroundColor: "gray",
  },
  disabled: {
    backgroundColor: "white",
  },
});

export default Passcode;
