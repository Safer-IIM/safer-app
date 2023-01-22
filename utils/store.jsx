import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  try {
    let jsonValue = value;
    if (typeof jsonValue !== "string") {
      jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      console.log("bien enregistré capitaine");
    }
  } catch (e) {
    console.log("cannot store ", value);
  }
};

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("cannot store ", e);
  }
};
