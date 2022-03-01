export const SPLASH_SCREEN_DELAY_MS = 3000;

export const PASSKEY_KEY = "passkey";
export const CREDENTIALS_KEY = "credentialskey";

export const PASSCODE_LENGTH = 5;

const assetDir = "../../assets/";

export const IMAGES = {
  logoHorizontal: require(`${assetDir}logo-horizontal.png`),
  logoVertical: require(`${assetDir}logo-vertical.png`),
  passwordManagerBg: require(`${assetDir}background-password-manager.jpg`),
  strongEncryptionBg: require(`${assetDir}background-strong-encryption.jpg`),
  masterPasswordBg: require(`${assetDir}background-master-password.jpg`),
  passwordManagerIcon: require(`${assetDir}icon-password-manager.png`),
  strongEncryptionIcon: require(`${assetDir}icon-strong-encryption.png`),
  masterPasswordIcon: require(`${assetDir}icon-master-password.png`),
};

export const COLOURS = {
  DARK_PERIWINKLE: "#605BDD",
  CRIMSON_RED: "#A30000",
  DARK_JUNGLE_GREEN: "#202020",
  VALENTINE_RED: "#F05050",
  GALLERY: "#EFEFEF",
  DUSTY_GREY: "#999999",
  LINEAR_GRADIENT: ["#4C669F", "#3B5998", "#192F6A"],
};

export const ADMOB = {
  androidBannerId: "ca-app-pub-8647038202432785/2582937329",
  androidTestBannerId: "ca-app-pub-3940256099942544/6300978111",
  iosBannerId: "ca-app-pub-8647038202432785/5564323887",
  iosTestBannerId: "ca-app-pub-3940256099942544/2934735716",
};
