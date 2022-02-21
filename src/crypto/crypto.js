import CryptoES from "crypto-es";
import * as Device from "expo-device";

const encrypt = (text, seed) => {
  const key = CryptoES.PBKDF2(seed, salt, { keySize: 256 / 32 }); // 256-bit
  const encryption = CryptoES.AES.encrypt(text, key, { iv: iv }).toString();
  if (!encryption) {
    throw new Error("Unable to encrypt");
  }
  return encryption;
};

const decrypt = (text, seed) => {
  const key = CryptoES.PBKDF2(seed, salt, { keySize: 256 / 32 }); // 256-bit
  const decryption = CryptoES.AES.decrypt(text, key, { iv: iv }).toString(CryptoES.enc.Utf8);
  if (!decryption) {
    throw new Error("Unable to decrypt");
  }
  return decryption;
};

const sha256 = (text) => {
  return CryptoES.SHA256(text).toString();
};

const salt = "RiPs7-P@$$w0rD-M@n@geR";
const iv = CryptoES.enc.Utf8.parse(sha256(Device.osBuildFingerprint));

export { encrypt, decrypt, sha256 };
