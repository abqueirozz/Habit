import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
  public async override(key: string, value: any) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (e) {
      // saving error
      console.error("saving error", e);
    } finally {
      console.log("override from", key);
    }
  }

  public async get<T>(key: string) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
    } catch (e) {
      // error reading value
      throw e;
    } finally {
      console.log("get from", key);
    }
  }

  public async set(key: string, value: any) {
    try {
      const prev = this.get(key);
      this.override(key, JSON.stringify({ ...prev, value }));
      return true;
    } catch (err) {
      throw err;
    }
  }
}
const instance = new Storage();
export const store = instance;

export enum keys {
  HABITS = "habits",
  SCORE = "score",
}
