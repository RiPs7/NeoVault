import * as Clipboard from "expo-clipboard";
import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Card, Icon } from "react-native-elements";
import Toast from "react-native-toast-message";
import { decrypt } from "../../crypto/crypto";
import { COLOURS } from "../../global/constants";

class CredentialsCard extends Component {
  constructor({ domain, username, password, passkey, onDelete }) {
    super();
    this.domain = domain;
    this.username = username;
    this.password = password;
    this.passkey = passkey;
    this.onDelete = onDelete;
    this.timerProps = {
      isPlaying: true,
      duration: 3,
      colors: [COLOURS.DARK_PERIWINKLE, COLOURS.DARK_PERIWINKLE, COLOURS.CRIMSON_RED, COLOURS.CRIMSON_RED],
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Card.Title>{this.domain}</Card.Title>
          <TouchableOpacity style={{ marginRight: 5 }} onPress={this.onDelete}>
            <Icon name="delete" color="red" />
          </TouchableOpacity>
        </View>
        <Card.Divider color={COLOURS.DARK_PERIWINKLE} />
        <View style={styles.row}>
          <TouchableOpacity
            onLongPress={() => {
              Clipboard.setString(decrypt(this.username, this.passkey));
              Toast.show({
                type: "success",
                text1: "Copied username.",
                visibilityTime: 1500,
              });
            }}
          >
            <Text style={this.state.isUsernameInvisible ? styles.invisibleText : styles.visibleText}>
              {this.state.isUsernameInvisible ? new Array(10).fill("*").join("") : decrypt(this.username, this.passkey)}
            </Text>
          </TouchableOpacity>
          {this.state.isUsernameInvisible ? (
            <Icon name="eye" type="ionicon" onPress={() => this.toggleCredentialsVisibility("username")} />
          ) : (
            <CountdownCircleTimer {...this.timerProps} onComplete={() => this.toggleCredentialsVisibility("username")}>
              {({ remainingTime, color }) => <Text style={{ color, fontSize: 10 }}>{remainingTime}</Text>}
            </CountdownCircleTimer>
          )}
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onLongPress={() => {
              Clipboard.setString(decrypt(this.password, this.passkey));
              Toast.show({
                type: "success",
                text1: "Copied password.",
                visibilityTime: 1500,
              });
            }}
          >
            <Text style={this.state.isPasswordInvisible ? styles.invisibleText : styles.visibleText}>
              {this.state.isPasswordInvisible ? new Array(10).fill("*").join("") : decrypt(this.password, this.passkey)}
            </Text>
          </TouchableOpacity>
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
    borderColor: COLOURS.DARK_PERIWINKLE,
    borderStyle: "dashed",
    backgroundColor: "transparent",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  visibleText: {
    color: COLOURS.DARK_JUNGLE_GREEN,
    fontWeight: "bold",
    fontSize: 14,
  },
  invisibleText: {
    color: "lightgrey",
    fontSize: 16,
  },
});

export default CredentialsCard;
