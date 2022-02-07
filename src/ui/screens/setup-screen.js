import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import SlidableList from "../components/slidable-list";

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
