import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

class NumpadButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.value} onPress={() => this.props.onButtonPressed(this.props.value)}>
          <Text style={styles.value}>{this.props.value}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: "dodgerblue",
    borderWidth: 1,
    borderRadius: 75,
    width: 75,
    height: 75,
  },
  value: {
    flex: 1,
    fontSize: 20,
    color: "dodgerblue",
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default NumpadButton;
