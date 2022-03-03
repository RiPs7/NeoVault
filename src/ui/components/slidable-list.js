import React, { Component, createRef } from "react";
import { Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IMAGES } from "../../global/constants";
import CustomButton from "./custom-button";

class SlidableList extends Component {
  constructor(props) {
    super(props);
    this.flatListRef = createRef();

    this.state = {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      activeIndex: 0,
    };

    this.slides = [
      {
        title: "Welcome to",
        image: IMAGES.passwordManagerIcon,
        catchPhrase: "Password Manager",
        background: IMAGES.passwordManagerBg,
        subtitle: "Store your passwords securely",
      },
      {
        title: "Employ",
        image: IMAGES.strongEncryptionIcon,
        catchPhrase: "Strong encryption",
        background: IMAGES.strongEncryptionBg,
        subtitle: "No one can see your stored passwords,\napart from you",
      },
      {
        title: "Set up your",
        image: IMAGES.masterPasswordIcon,
        catchPhrase: "Master Passcode",
        background: IMAGES.masterPasswordBg,
        subtitle: "and you are ready to go",
      },
    ];
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          ref={this.flatListRef}
          data={this.slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          style={styles.flatList}
          renderItem={this.renderSlide}
          keyExtractor={(_, index) => index.toString()}
          onMomentumScrollEnd={this.handleMomentumScrollEnd}
          extraData={this.state.width}
        />
      </View>
    );
  }

  goToSlide = (slideNum) => () => {
    this.setState({ activeIndex: slideNum });
  };

  renderSlide = ({ item }) => {
    return (
      <View style={{ width: this.state.width, ...styles.slideContainer }}>
        <ImageBackground style={styles.backgroundImage} source={item.background} resizeMode="cover">
          <View style={styles.slide}>
            <View style={styles.titleContainer}>
              <Text allowFontScaling={false} style={styles.title}>
                {item.title}
              </Text>
            </View>
            <Image style={{ width: 200, height: 200 }} source={item.image} />
            <View style={styles.catchPhraseContainer}>
              <Text allowFontScaling={false} style={styles.catchPhrase}>
                {item.catchPhrase}
              </Text>
            </View>
            <View style={styles.subtitleContainer}>
              <Text allowFontScaling={false} style={styles.subtitle}>
                {item.subtitle}
              </Text>
            </View>
          </View>
          {this.renderPagination()}
        </ImageBackground>
      </View>
    );
  };

  renderPagination = () => {
    if (this.state.activeIndex !== this.slides.length - 1) {
      return (
        <View style={styles.paginationContainer}>
          <View style={styles.paginationDots}>
            {new Array(this.slides.length).fill(0).map((_, i) => (
              <TouchableOpacity
                hitSlop={{ left: 15, right: 15, top: 15, bottom: 15 }}
                key={i}
                style={[styles.dot, i === this.state.activeIndex ? styles.activeDotStyle : styles.dotStyle]}
                onPress={this.goToSlide(i)}
              />
            ))}
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.buttonContainer}>
          <CustomButton value="Let's start" onPress={() => this.props.onFinish()} />
          <TouchableOpacity>
            <Text style={styles.importText}>or import existing data</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  handleMomentumScrollEnd = ({ nativeEvent }) => {
    const offset = nativeEvent.contentOffset.x;
    const newIndex = Math.round(offset / this.state.width);
    if (newIndex === this.state.activeIndex) {
      return;
    }
    this.setState({ activeIndex: newIndex });
  };
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    flexDirection: "row",
  },
  slideContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  slide: {
    flex: 0.7,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  titleContainer: {
    paddingHorizontal: 40,
    alignItems: "center",
  },
  title: {
    flexWrap: "wrap",
    fontSize: 30,
    color: "white",
    textAlign: "center",
  },
  catchPhraseContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  catchPhrase: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
    flexWrap: "wrap",
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  subtitle: {
    color: "white",
    textAlign: "center",
    fontSize: 17,
    flexWrap: "wrap",
  },
  transitionBackground: {
    flex: 1,
    justifyContent: "center",
  },
  paginationContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignContent: "center",
    bottom: -50,
  },
  paginationDots: {
    height: 16,
    margin: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    marginHorizontal: 16,
  },
  activeDotStyle: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  dotStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignContent: "center",
  },
  importText: {
    alignSelf: "center",
    marginTop: 25,
    fontSize: 20,
    textDecorationLine: "underline",
    color: "white",
  },
});

export default SlidableList;
