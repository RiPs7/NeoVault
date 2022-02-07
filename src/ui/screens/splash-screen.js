import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { Dimensions, Image, ImageBackground, Text } from "react-native";
import { IMAGES, PASSKEY_KEY, SPLASH_SCREEN_DELAY_MS } from "../../global/constants";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    AsyncStorage.getItem(PASSKEY_KEY, (err, result) => {
      if (!err && result) {
        setTimeout(() => this.props.navigation.replace("LoginScreen", { forSetup: false }), SPLASH_SCREEN_DELAY_MS);
      } else {
        setTimeout(() => this.props.navigation.replace("SetupScreen"), SPLASH_SCREEN_DELAY_MS);
      }
    });
  }

  render() {
    return (
      <ImageBackground
        style={{ width: WIDTH, height: HEIGHT, alignItems: "center", justifyContent: "center" }}
        source={IMAGES.passwordManagerBg}
        resizeMode="cover"
      >
        <Image style={{ alignSelf: "center", width: 200, height: 200 }} source={IMAGES.passwordManagerIcon} />
        <Text style={{ color: "white", fontSize: 17 }}>PASSWORD MANAGER</Text>
      </ImageBackground>
    );
  }
}

export default SplashScreen;
