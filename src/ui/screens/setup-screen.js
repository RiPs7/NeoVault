import React, { Component } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import SlidableList from "../components/slidable-list";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

class SetupScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <SlidableList onFinish={() => this.props.navigation.replace("LoginScreen", { forSetup: true })}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
});

export default SetupScreen;
