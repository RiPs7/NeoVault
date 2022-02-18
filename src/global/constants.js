export const SPLASH_SCREEN_DELAY_MS = 3000;

export const PASSKEY_KEY = "passkey";
export const CREDENTIALS_KEY = "credentialskey";

export const PASSCODE_LENGTH = 5;

const assetDir = "../../assets/";

export const IMAGES = {
    passwordManagerIcon: require(`${assetDir}password-manager-icon.png`),
    passwordManagerBg: require(`${assetDir}password-manager-bg.jpg`),
    strongEncryptionIcon: require(`${assetDir}strong-encryption-icon.png`),
    strongEncryptionBg: require(`${assetDir}strong-encryption-bg.jpg`),
    masterPasswordIcon: require(`${assetDir}master-password-icon.png`),
    masterPasswordBg: require(`${assetDir}master-password-bg.jpg`),
    logo: require(`${assetDir}logo.png`),
}

export const ADMOB = {
    androidBannerId: "ca-app-pub-8647038202432785/2582937329",
    androidTestBannerId: "ca-app-pub-3940256099942544/6300978111",
    iosBannerId: "ca-app-pub-8647038202432785/5564323887",
    iosTestBannerId: "ca-app-pub-3940256099942544/2934735716"
}