import AsyncStorage from "@react-native-async-storage/async-storage";
import { CREDENTIALS_KEY, PASSKEY_KEY, UNIQUE_ID_KEY } from "../global/constants";

export const storeUuid = (uuid, cb) => {
  AsyncStorage.setItem(UNIQUE_ID_KEY, uuid, cb);
}

export const loadUuid = (cb) => {
  AsyncStorage.getItem(UNIQUE_ID_KEY, cb);
}

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
          key: Math.max(...oldCredentials.map((cred) => cred.key)) + 1,
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

export const deleteCredentials = (key, cb) => {
  AsyncStorage.getItem(CREDENTIALS_KEY, (err, res) => {
    if (!err) {
      const oldCredentials = res ? JSON.parse(res) : [];
      const newCredentials = oldCredentials.filter((creds) => creds.key !== key);
      AsyncStorage.setItem(CREDENTIALS_KEY, JSON.stringify(newCredentials), cb);
    }
  });
};
