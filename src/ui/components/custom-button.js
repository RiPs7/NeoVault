import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

class CustomButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]} style={styles.linearGradient}>
        <TouchableOpacity style={styles.button} onPress={() => this.props.onPress()}>
          <Text style={styles.buttonText}>{this.props.value}</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    height: 50,
    alignContent: "center",
  },
  button: {
    flex: 1,
  },
  buttonText: {
    flex: 1,
    fontSize: 20,
    padding: 15,
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    color: "#ffffff",
  },
});

export default CustomButton;
