import { AdMobBanner } from "expo-ads-admob";
import * as Device from "expo-device";
import { Formik } from "formik";
import React, { Component } from "react";
import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { Icon } from "react-native-elements";
import Toast from "react-native-toast-message";
import * as yup from "yup";
import { encrypt } from "../../crypto/crypto";
import { deleteCredentials, loadAllCredentials, storeCredentials } from "../../database/database-helper";
import { ADMOB, IMAGES } from "../../global/constants";
import CredentialsCard from "../components/credentials-card";

const addCredentialsSchema = yup.object({
  domain: yup
    .string()
    .required("Domain / Account name is required.")
    .min(2, "This is not a valid domain / account name."),
  username: yup.string().required("Username is required."),
  password: yup.string().required("Password is required."),
});

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
      modalPasswordVisible: false,
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
        <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.modalContainer}>
              <View style={styles.modalTitleContainer}>
                <TouchableOpacity style={styles.modalBackButton} onPress={this.toggleModal}>
                  <Text>
                    <Icon name="arrow-back" type="ionicon" />
                  </Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Add Credentials</Text>
              </View>
              <View style={styles.modalInnerContainer}>
                <Formik
                  initialValues={{
                    domain: "",
                    username: "",
                    password: "",
                  }}
                  validationSchema={addCredentialsSchema}
                  onSubmit={(values) => {
                    this.addCredentials(values);
                    this.toggleModal();
                  }}
                >
                  {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
                    <View style={styles.modalTextInputArea}>
                      <View style={styles.modalInput}>
                        <TextInput
                          style={styles.modalTextInput}
                          placeholder="Domain / Account name"
                          onChangeText={handleChange("domain")}
                          onBlur={handleBlur("domain")}
                          value={values.domain}
                        />
                        <Text style={styles.errorText}>{touched.domain && errors.domain}</Text>
                      </View>
                      <View style={styles.modalInput}>
                        <TextInput
                          style={styles.modalTextInput}
                          autoCorrect={false}
                          autoComplete={false}
                          autoCapitalize="none"
                          placeholder="Username"
                          onChangeText={handleChange("username")}
                          onBlur={handleBlur("username")}
                          value={values.username}
                        />
                        <Text style={styles.errorText}>{touched.username && errors.username}</Text>
                      </View>
                      <View style={styles.modalInput}>
                        <View style={styles.modalPasswordContainer}>
                          <TextInput
                            style={styles.modalPasswordInput}
                            secureTextEntry={!this.state.modalPasswordVisible}
                            textContentType="none"
                            autoCorrect={false}
                            autoComplete={false}
                            autoCapitalize="none"
                            placeholder="Password"
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            value={values.password}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              this.setState((prevState) => ({
                                ...prevState,
                                modalPasswordVisible: !prevState.modalPasswordVisible,
                              }));
                            }}
                          >
                            <Icon name="eye" type="ionicon" size={14} />
                          </TouchableOpacity>
                        </View>
                        <Text style={styles.errorText}>{touched.password && errors.password}</Text>
                      </View>
                      <View style={styles.modalAddButtonArea}>
                        <Button title="Add" onPress={handleSubmit} />
                      </View>
                    </View>
                  )}
                </Formik>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
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
    color: "#707070A0",
    textAlign: "center",
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    elevation: 20,
    backgroundColor: "#605BDD",
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
  modalContainer: {
    backgroundColor: "white",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  modalTitleContainer: {
    backgroundColor: "#EFEFEF",
    height: 50,
    elevation: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  modalBackButton: {
    marginLeft: 10,
  },
  modalTitle: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 20,
  },
  modalInnerContainer: {
    flex: 1,
    padding: 50,
  },
  modalTextInputArea: {
    flex: 1,
  },
  modalInput: {
    marginBottom: 50,
  },
  modalTextInput: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  modalPasswordContainer: {
    flexDirection: "row",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  modalPasswordInput: {
    flex: 1,
  },
  modalAddButtonArea: {
    flex: 1,
    justifyContent: "flex-end",
  },
  errorText: {
    color: "#F05050",
  },
});

export default HomeScreen;
