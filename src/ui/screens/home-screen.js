import { AdMobBanner } from "expo-ads-admob";
import * as Device from "expo-device";
import React, { Component } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import Toast from "react-native-toast-message";
import { encrypt } from "../../crypto/crypto";
import { deleteCredentials, loadAllCredentials, storeCredentials } from "../../database/database-helper";
import { ADMOB, COLOURS, IMAGES } from "../../global/constants";
import AddCredentialsForm from "../components/add-credentials-form";
import CredentialsCard from "../components/credentials-card";

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    // The passkey is passed as a router
    // parameter to be used in the main app
    this.passkey = props.route.params?.passkey;

    // Bind 'this' to the required functions
    this.renderCredentialsCard = this.renderCredentialsCard.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

    // The component state:
    // 1) The list of credentials to display
    // 2) The visibility state of the modal
    this.state = {
      credentials: [],
      modalVisible: false,
    };

    // The banner ID based on the Platform
    const testID = Platform.OS === "ios" ? ADMOB.iosTestBannerId : ADMOB.androidTestBannerId;
    const productionID = Platform.OS === "ios" ? ADMOB.iosBannerId : ADMOB.androidBannerId;
    const isDevEnvironment = !Device.isDevice || __DEV__;
    this.bannerId = isDevEnvironment ? testID : productionID;
  }

  // After the component mounts, we load all the
  // credentials and store them in the component state
  componentDidMount() {
    loadAllCredentials((err, res) => {
      if (!err) {
        this.setState((prevState) => ({
          ...prevState,
          credentials: res ? JSON.parse(res) : [],
        }));
      }
    });
  }

  // Adds the supplied credentials to the local storage,
  // shows a success toast message and reloads all the
  // credentials.
  addCredentials({ domain, username, password }) {
    storeCredentials(domain, encrypt(username, this.passkey), encrypt(password, this.passkey), (err, res) => {
      if (!err) {
        Toast.show({
          type: "success",
          text1: "Credentials stored securely.",
          visibilityTime: 1500,
        });
        loadAllCredentials((err2, res2) => {
          if (!err2) {
            this.setState({ credentials: JSON.parse(res2) });
          }
        });
      }
    });
  }

  removeCredentials(key) {
    deleteCredentials(key, (err, res) => {
      if (!err) {
        Toast.show({
          type: "success",
          text1: "Credentials deleted successfully.",
          visibilityTime: 1500,
        });
        loadAllCredentials((err2, res2) => {
          if (!err2) {
            this.setState({ credentials: JSON.parse(res2) });
          }
        });
      }
    });
  }

  // Renders a set of credentials as
  // an individual credentials card
  renderCredentialsCard({ key, domain, username, password }) {
    return (
      <CredentialsCard
        domain={domain}
        username={username}
        password={password}
        passkey={this.passkey}
        onDelete={() =>
          Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete the credentials for " + domain + "?",
            [
              {
                text: "Yes",
                onPress: () => this.removeCredentials(key),
                style: "default",
              },
              {
                text: "Cancel",
                style: "cancel",
              },
            ],
            {
              cancelable: true,
            }
          )
        }
      />
    );
  }

  // Renders the main view
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.containerInner}>
            <Image source={IMAGES.logoHorizontal} resizeMode="contain" style={styles.logo} />
            {this.state.credentials.length === 0 ? (
              <View style={styles.emptyMessageContainer}>
                <Text style={styles.emptyMessage}>
                  You have no credentials stored yet.
                  {"\n\n"}
                  Press the + icon to store your first credentials securely.
                </Text>
              </View>
            ) : (
              <FlatList
                contentContainerStyle={{ paddingBottom: 20 }}
                data={this.state.credentials}
                renderItem={({ item }) => this.renderCredentialsCard(item)}
                keyExtractor={(item) => item.key}
              />
            )}
          </View>
        </View>
        <TouchableOpacity style={styles.actionButton} onPress={this.toggleModal}>
          <Icon name="plus" type="font-awesome-5" color="white" />
        </TouchableOpacity>
        <View style={styles.adBannerContainer}>
          <AdMobBanner bannerSize="banner" adUnitID={this.bannerId} servePersonalizedAds={false} />
        </View>
        {this.renderModal()}
      </SafeAreaView>
    );
  }

  // Modal

  // Toggles the modal visibility
  toggleModal() {
    this.setState((prevState) => ({
      ...prevState,
      modalVisible: !prevState.modalVisible,
    }));
  }

  // Renders the modal view
  renderModal() {
    return (
      <Modal animationType="slide" transparent={true} visible={this.state.modalVisible}>
        <AddCredentialsForm
          onSubmit={(credentials) => {
            this.addCredentials(credentials);
            this.toggleModal();
          }}
          onBackPressed={this.toggleModal}
        />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  containerInner: {
    flex: 1,
    justifyContent: "flex-start",
    width: Dimensions.get("window").width,
    marginBottom: 60,
  },
  logo: {
    width: 150,
    height: 50,
    marginTop: 20,
    alignSelf: "center",
  },
  emptyMessageContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    marginHorizontal: 70,
  },
  emptyMessage: {
    fontSize: 30,
    color: COLOURS.DUSTY_GREY,
    textAlign: "center",
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    elevation: 20,
    backgroundColor: COLOURS.DARK_PERIWINKLE,
    position: "absolute",
    bottom: 60,
    right: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  adBannerContainer: {
    position: "absolute",
    width: Dimensions.get("window").width,
    bottom: 0,
    alignItems: "center",
  },
});

export default HomeScreen;
