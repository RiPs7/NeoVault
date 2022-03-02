import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLOURS } from "../../global/constants";

class CustomButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LinearGradient colors={COLOURS.LINEAR_GRADIENT} style={styles.linearGradient}>
        <TouchableOpacity style={styles.button} onPress={() => this.props.onPress()}>
          <Text style={styles.buttonText}>{this.props.value}</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    height: 80,
    marginHorizontal: 30,
    alignContent: "center",
    borderRadius: 20,
  },
  button: {
    flex: 1,
  },
  buttonText: {
    flex: 1,
    fontSize: 30,
    padding: 15,
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    color: "#ffffff",
    ...Platform.select({
      ios: {
        lineHeight: 50,
      },
      android: {
        textAlignVertical: "center",
      },
    }),
  },
});

export default CustomButton;
