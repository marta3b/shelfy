
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@user_data';

export const storage = {
  saveUser: async (userData: { email: string; password: string; name?: string }) => {
    try {
      const jsonValue = JSON.stringify(userData);
      await AsyncStorage.setItem(USER_KEY, jsonValue);
      return true;
    } catch (e) {
      return false;
    }
  },

  getUser: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(USER_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      return null;
    }
  },

  removeUser: async () => {
    try {
      await AsyncStorage.removeItem(USER_KEY);
      return true;
    } catch (e) {
      return false;
    }
  }
};