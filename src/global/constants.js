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
}

export const ADMOB = {
    androidBannerId: "ca-app-pub-8647038202432785/2582937329",
    androidTestBannerId: "ca-app-pub-3940256099942544/6300978111",
    iosBannerId: "ca-app-pub-8647038202432785/5564323887",
    iosTestBannerId: "ca-app-pub-3940256099942544/2934735716"
}