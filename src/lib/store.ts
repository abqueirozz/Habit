import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
  public async set(key: string, value: any) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
      console.error("saving error", e);
    }
  }

  public async get(key: string) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      console.error("reading error", e);
    }
  }
}
const instance =  new Storage()
export const store = instance

export enum keys {
  HABITS = 'habits',
  SCORE = 'score'
}
