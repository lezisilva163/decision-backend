import { env } from "@/env";
import CryptoJS from "crypto-js";

export function encryptData(data: string): string {
  const encrypted = CryptoJS.AES.encrypt(data, env.SECRET_KEY).toString();
  return encrypted;
}

// Função para descriptografar o dado sensível
export function decryptData(encryptedData: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedData, env.SECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
}
