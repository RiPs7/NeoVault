import { Formik } from "formik";
import React, { Component } from "react";
import {
  Button,
  Dimensions,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import * as yup from "yup";
import { COLOURS } from "../../global/constants";

const addCredentialsSchema = yup.object({
  domain: yup
    .string()
    .required("Domain / Account name is required.")
    .min(2, "This is not a valid domain / account name."),
  username: yup.string().required("Username is required."),
  password: yup.string().required("Password is required."),
});

class AddCredentialsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalPasswordVisible: false,
    };
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.modalContainer}>
            <View style={styles.modalTitleContainer}>
              <TouchableOpacity style={styles.modalBackButton} onPress={this.props.onBackPressed}>
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
                onSubmit={this.props.onSubmit}
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
                          <Icon name="eye" type="ionicon" size={24} />
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.errorText}>{touched.password && errors.password}</Text>
                    </View>
                    <View style={styles.modalAddButtonArea}>
                      {/* <CustomButton value="Add" onPress={handleSubmit} /> */}
                      <Button title="Add" onPress={handleSubmit} />
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  modalTitleContainer: {
    backgroundColor: COLOURS.GALLERY,
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
    padding: 50,
  },
  modalTextInputArea: {},
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
    justifyContent: "flex-end",
    marginBottom: 50,
  },
  errorText: {
    color: COLOURS.VALENTINE_RED,
  },
});

export default AddCredentialsForm;
