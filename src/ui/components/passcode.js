import React, { Component } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { sha256 } from "../../crypto/crypto";
import { PASSCODE_LENGTH } from "../../global/constants";

class Passcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passcode: [],
    };
    this.shakeAnimation = new Animated.Value(0);
  }

  // Adds a digit to the passcode.
  // If the required length is reached, it calls onSubmit, passing two callbacks
  // for success and for error.
  // The consumer is responsible to call onSuccess and onError
  addDigit(digit, onSubmit) {
    const curretPasscode = this.state.passcode.concat(digit);
    this.setState({ passcode: curretPasscode });
    if (curretPasscode.length == PASSCODE_LENGTH) {
      onSubmit(curretPasscode.join(""), () => {
        this.clearDigits();
        this.shakePasscode();
      })
    }
  }

  clearDigits() {
    this.setState({ passcode: [] });
  }

  shakePasscode() {
    Animated.sequence([
      Animated.timing(this.shakeAnimation, { toValue: 5, duration: 100, useNativeDriver: true }),
      Animated.timing(this.shakeAnimation, { toValue: -5, duration: 100, useNativeDriver: true }),
      Animated.timing(this.shakeAnimation, { toValue: 5, duration: 100, useNativeDriver: true }),
      Animated.timing(this.shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();
  }

  padPasscode(passcode) {
    return Array.from({ ...passcode, length: PASSCODE_LENGTH });
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
