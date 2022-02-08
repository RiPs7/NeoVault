import React, { Component } from "react";
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Card, Icon } from "react-native-elements";
import { decrypt } from "../../crypto/crypto";
import { IMAGES } from "../../global/constants";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.passkey = props.route.params.passkey;
    this.decryptAndRender = this.decryptAndRender.bind(this);

    // Mock a scenario (overwrite the saved passkey just for the mocked scenario)
    this.passkey = "6d9aef76689a393eb013eed714cc42c702b3c61752751a61924852e767d660b4";
    // This should be eventually loaded from a DB or something.
    this.state = {
      credentials: [
        {
          key: 0,
          domain: "Google",
          username: "oPidyB0EAUJC8q6b9kdWVw==",
          password: "fVHKlx9Z+T4wp5324hNv2g==",
          isUsernameInvisible: true,
          isPasswordInvisible: true,
        },
        {
          key: 1,
          domain: "Microsoft",
          username: "UBxeVH0zYkK6m/WBcONDhQ==",
          password: "ukuDEaW4Vq43qU0nx+hvsw==",
          isUsernameInvisible: true,
          isPasswordInvisible: true,
        },
        {
          key: 2,
          domain: "Facebook",
          username: "mGkOtqlMtl6FXfFX6C9omg==",
          password: "VA7Iv+z2fudu4Xmr0Ro3WA==",
          isUsernameInvisible: true,
          isPasswordInvisible: true,
        },
      ],
    };
  }

  toggleCredentials(key, prop) {
    this.setState((prevState) => {
      const newCredentials = prevState.credentials.map((cred) => {
        if (cred.key === key) {
          if (prop === "username") {
            cred.isUsernameInvisible = !cred.isUsernameInvisible;
          } else if (prop === "password") {
            cred.isPasswordInvisible = !cred.isPasswordInvisible;
          }
        }
        return cred;
      });
      return { credentials: newCredentials };
    });
  }

  decryptAndRender({ item }) {
    const { key, domain, username, password, isUsernameInvisible, isPasswordInvisible } = item;
    const invisibleUsername = new Array(10).fill("*").join("");
    const invisiblePassword = new Array(10).fill("*").join("");
    return (
      <Card containerStyle={styles.cardContainer}>
        <Card.Title>{domain}</Card.Title>
        <Card.Divider color="#605BDD" />
        <View style={styles.row}>
          <Text style={isUsernameInvisible ? styles.invisibleText : styles.visibleText}>
            {isUsernameInvisible ? invisibleUsername : decrypt(username, this.passkey)}
          </Text>
          <Icon name="eye" type="ionicon" onPress={() => this.toggleCredentials(key, "username")} />
        </View>
        <View style={styles.row}>
          <Text style={isPasswordInvisible ? styles.invisibleText : styles.visibleText}>
            {isPasswordInvisible ? invisiblePassword : decrypt(password, this.passkey)}
          </Text>
          <Icon name="eye" type="ionicon" onPress={() => this.toggleCredentials(key, "password")} />
        </View>
      </Card>
    );
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.containerInner}>
            <Image source={IMAGES.logo} resizeMode="contain" style={styles.logo} />
            <FlatList
              data={this.state.credentials}
              renderItem={this.decryptAndRender}
              keyExtractor={(item) => item.key}
            />
          </View>
        </View>
      </SafeAreaView>
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
    flex: 1,
    justifyContent: "space-evenly",
    width: Dimensions.get("window").width,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 30,
  },
  cardContainer: {
    flex: 1,
    margin: 30,
    elevation: 0,
    borderRadius: 20,
    borderColor: "#605BDD",
    borderStyle: "dashed",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
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

export default HomeScreen;
