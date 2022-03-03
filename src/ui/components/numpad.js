import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View, LogBox } from "react-native";
import { Icon } from "react-native-elements";
import NumpadButton from "./numpad-button";
import {
  hasHardwareAsync,
  isEnrolledAsync,
  authenticateAsync,
  supportedAuthenticationTypesAsync,
  AuthenticationType,
} from "expo-local-authentication";

class Numpad extends Component {
  constructor(props) {
    super(props);
    LogBox.ignoreLogs(["Warning: ..."]);

    this.forSetup = props.forSetup;

    this.state = {
      fingerprints: false,
    };
  }

  async componentDidMount() {
    if (this.forSetup) {
      return;
    }
    const compatible = await hasHardwareAsync();
    if (!compatible) {
      console.warn("Device not compatible with biometrics");
      return;
    }
    const enrolled = await isEnrolledAsync();
    if (!enrolled) {
      console.warn("No biometrics are enrolled");
      return;
    }
    const fingerprintsSuppoered = await supportedAuthenticationTypesAsync();
    if (!fingerprintsSuppoered.includes(AuthenticationType.FINGERPRINT)) {
      console.warn("Fingerprint is not supported");
      return;
    }
    this.setState({
      fingerprints: true,
    });
  }

  async initBiometrics() {
    const result = await authenticateAsync({
      disableDeviceFallback: true,
      cancelLabel: "Cancel",
      ...(Platform.OS === "ios" && { fallbackLabel: "" }),
    });
    if (result?.success) {
      this.props.onBiometricsSuccess();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {new Array(3).fill(0).map((_, row) => (
          <View key={row} style={styles.row}>
            {new Array(3).fill(0).map((_, col) => {
              const value = 3 * row + col + 1;
              return <NumpadButton key={value} value={value} onButtonPressed={(btn) => this.onDigitPressed(btn)} />;
            })}
          </View>
        ))}
        <View style={styles.row}>
          {this.forSetup || !this.state.fingerprints ? (
            <View style={{ width: 75, height: 75 }} />
          ) : (
            <View style={styles.fingerprintContainer}>
              <TouchableOpacity style={styles.fingerprint} onPress={() => this.initBiometrics()}>
                <Icon name="fingerprint" type="material" color="dodgerblue" size={40} />
              </TouchableOpacity>
            </View>
          )}
          <NumpadButton key="0" value="0" onButtonPressed={(btn) => this.onDigitPressed(btn)}></NumpadButton>
          <NumpadButton key="C" value="C" onButtonPressed={() => this.onClearPressed()}></NumpadButton>
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
  fingerprintContainer: {
    borderColor: "dodgerblue",
    borderWidth: 1,
    borderRadius: 75,
    width: 75,
    height: 75,
  },
  fingerprint: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        lineHeight: 75,
      },
      android: {
        textAlignVertical: "center",
      },
    }),
  },
});

export default Numpad;
