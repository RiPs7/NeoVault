import AsyncStorage from "@react-native-async-storage/async-storage";
import { CREDENTIALS_KEY, PASSKEY_KEY } from "../global/constants";

export const storePasskey = (passkey, cb) => {
  AsyncStorage.setItem(PASSKEY_KEY, passkey, cb);
};

export const loadPasskey = (cb) => {
  AsyncStorage.getItem(PASSKEY_KEY, cb);
};

export const loadAllCredentials = (cb) => {
  AsyncStorage.getItem(CREDENTIALS_KEY, cb);
};

export const storeCredentials = (domain, username, password, cb) => {
  AsyncStorage.getItem(CREDENTIALS_KEY, (err, res) => {
    if (!err) {
      const oldCredentials = res ? JSON.parse(res) : [];
      const newCredentials = [
        ...oldCredentials,
        {
          key: oldCredentials.length,
          domain: domain,
          username: username,
          password: password,
          isUsernameInvisible: true,
          isPasswordInvisible: true,
        },
      ];
      AsyncStorage.setItem(CREDENTIALS_KEY, JSON.stringify(newCredentials), cb);
    }
  });
};
