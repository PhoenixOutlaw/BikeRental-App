import * as SecureStore from "expo-secure-store";

export async function setAppstore(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  
  export async function getAppstore(key) {
    return await SecureStore.getItemAsync(key);
  }
  export async function delAppstore(key) {
    let result = await SecureStore.deleteItemAsync(key);
  }