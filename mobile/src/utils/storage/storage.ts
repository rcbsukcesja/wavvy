import storage from '@react-native-async-storage/async-storage';

export const setStorageItem = async <T>(key: string, value: T) => {
  const serializedValue = JSON.stringify(value);
  await storage.setItem(key, serializedValue);
};

export const getStorageItem = async <T>(key: string) => {
  const serializedValue = await storage.getItem(key);
  if (!serializedValue) {
    return null;
  }
  const deserializedValue = JSON.parse(serializedValue) as T;

  return deserializedValue;
};

export const removeStorageItem = (key: string): void => {
  storage.removeItem(key);
};

export const clearStorage = (): void => {
  storage.clear();
};
