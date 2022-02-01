import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { encrypt, decrypt } from "../../crypto/crypto";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.passcodeHash = props.route.params.passcodeHash;
    // Define here a mock scenario
    this.text = "Hello World";
    this.encryptedText = encrypt(this.text, this.passcodeHash);
    this.decryptedText = decrypt(this.encryptedText, this.passcodeHash);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerInner}>
          <Text>{"Passcode hash: " + this.passcodeHash}</Text>
          <Text>{"Original text: " + this.text}</Text>
          <Text>{"Encrypted text: " + this.encryptedText}</Text>
          <Text>{"Decrypted text: " + this.decryptedText}</Text>
        </View>
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
  containerInner: {
    width: 300,
    flex: 1,
    justifyContent: "space-evenly"
  }
});

export default HomeScreen;
