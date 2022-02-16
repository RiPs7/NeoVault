import AsyncStorage from "@react-native-async-storage/async-storage";
import { CREDENTIALS_KEY, PASSKEY_KEY } from "../global/constants";

export const prepareMockCredentials = () => {
  // passkey = 6d9aef76689a393eb013eed714cc42c702b3c61752751a61924852e767d660b4
  const mockCredentials = [
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
  ];
  AsyncStorage.setItem(CREDENTIALS_KEY, JSON.stringify(mockCredentials));
};

export const storePasskey = (passkey, cb) => {
  AsyncStorage.setItem(PASSKEY_KEY, cb);
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
      const oldCredentials = JSON.parse(res);
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
