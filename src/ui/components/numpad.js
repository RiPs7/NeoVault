import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import NumpadButton from "./numpad-button";

class Numpad extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <NumpadButton value="1" onButtonPressed={(btn) => this.onDigitPressed(btn)}></NumpadButton>
          <NumpadButton value="2" onButtonPressed={(btn) => this.onDigitPressed(btn)}></NumpadButton>
          <NumpadButton value="3" onButtonPressed={(btn) => this.onDigitPressed(btn)}></NumpadButton>
        </View>
        <View style={styles.row}>
          <NumpadButton value="4" onButtonPressed={(btn) => this.onDigitPressed(btn)}></NumpadButton>
          <NumpadButton value="5" onButtonPressed={(btn) => this.onDigitPressed(btn)}></NumpadButton>
          <NumpadButton value="6" onButtonPressed={(btn) => this.onDigitPressed(btn)}></NumpadButton>
        </View>
        <View style={styles.row}>
          <NumpadButton value="7" onButtonPressed={(btn) => this.onDigitPressed(btn)}></NumpadButton>
          <NumpadButton value="8" onButtonPressed={(btn) => this.onDigitPressed(btn)}></NumpadButton>
          <NumpadButton value="9" onButtonPressed={(btn) => this.onDigitPressed(btn)}></NumpadButton>
        </View>
        <View style={styles.row}>
          <View style={{ width: 75, height: 75 }}></View>
          <NumpadButton value="0" onButtonPressed={(btn) => this.onDigitPressed(btn)}></NumpadButton>
          <NumpadButton value="C" onButtonPressed={() => this.onClearPressed()}></NumpadButton>
        </View>
      </View>
    );
  }

  onDigitPressed(btn) {
    this.props.onDigitPressed(btn);
  }

  onClearPressed() {
    this.props.onClearPressed();
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: 300,
    height: 350,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Numpad;
