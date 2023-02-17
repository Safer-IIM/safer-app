import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    let jsonValue = value;
    if (typeof jsonValue !== 'string') {
      jsonValue = JSON.stringify(value);
    }
    await AsyncStorage.setItem(key, jsonValue);
    return 'success';
  } catch (e) {
    return e;
  }
};

export const getData = async (key, type = 'object') => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? (type === 'string') ? jsonValue : JSON.parse(jsonValue) : null;
  } catch (e) {
    return e;
  }
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
};
