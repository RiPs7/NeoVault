import React, { Component, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Icon } from "react-native-elements";
import { decrypt } from "../../crypto/crypto";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

class CredentialsCard extends Component {
  constructor({ domain, username, password, passkey }) {
    super();
    this.domain = domain;
    this.username = username;
    this.password = password;
    this.passkey = passkey;
    this.timerProps = {
      isPlaying: true,
      duration: 3,
      colors: ["#605BDD", "#605BDD", "#A30000", "#A30000"],
      colorsTime: [3, 2, 1, 0],
      size: 26,
      strokeWidth: 5,
    };
    this.state = {
      isUsernameInvisible: true,
      isPasswordInvisible: true,
    };
  }

  toggleCredentialsVisibility(prop) {
    this.setState((prevState) => ({
      isUsernameInvisible: prop === "username" ? !prevState.isUsernameInvisible : prevState.isUsernameInvisible,
      isPasswordInvisible: prop === "password" ? !prevState.isPasswordInvisible : prevState.isPasswordInvisible,
    }));
  }

  render() {
    return (
      <Card containerStyle={styles.cardContainer}>
        <Card.Title>{this.domain}</Card.Title>
        <Card.Divider color="#605BDD" />
        <View style={styles.row}>
          <Text style={this.state.isUsernameInvisible ? styles.invisibleText : styles.visibleText}>
            {this.state.isUsernameInvisible ? new Array(10).fill("*").join("") : decrypt(this.username, this.passkey)}
          </Text>
          {this.state.isUsernameInvisible ? (
            <Icon name="eye" type="ionicon" onPress={() => this.toggleCredentialsVisibility("username")} />
          ) : (
            <CountdownCircleTimer {...this.timerProps} onComplete={() => this.toggleCredentialsVisibility("username")}>
              {({ remainingTime, color }) => <Text style={{ color, fontSize: 10 }}>{remainingTime}</Text>}
            </CountdownCircleTimer>
          )}
        </View>
        <View style={styles.row}>
          <Text style={this.state.isPasswordInvisible ? styles.invisibleText : styles.visibleText}>
            {this.state.isPasswordInvisible ? new Array(10).fill("*").join("") : decrypt(this.password, this.passkey)}
          </Text>
          {this.state.isPasswordInvisible ? (
            <Icon name="eye" type="ionicon" onPress={() => this.toggleCredentialsVisibility("password", true)} />
          ) : (
            <CountdownCircleTimer {...this.timerProps} onComplete={() => this.toggleCredentialsVisibility("password")}>
              {({ remainingTime, color }) => <Text style={{ color, fontSize: 10 }}>{remainingTime}</Text>}
            </CountdownCircleTimer>
          )}
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginVertical: 30,
    marginHorizontal: 70,
    elevation: 0,
    borderRadius: 20,
    borderColor: "#605BDD",
    borderStyle: "dashed",
    backgroundColor: "transparent",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  visibleText: {
    color: "#202020",
    fontWeight: "bold",
    fontSize: 14,
  },
  invisibleText: {
    color: "lightgrey",
    fontSize: 16,
  },
});

export default CredentialsCard;
