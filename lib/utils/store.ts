import keytar from 'keytar';
import crypto from 'crypto';
import Conf from 'conf';

const configName = 'orioleStore';

export const getEncryptionKey = async () => {
  const encryptionKey = await keytar.getPassword('oriole', 'secret');
  if (!encryptionKey) {
    const newEncryptionKey = crypto.randomBytes(256).toString('base64');
    keytar.setPassword('oriole', 'secret', newEncryptionKey);
    return newEncryptionKey;
  }
  return encryptionKey;
};

export const getStore = async () => {
  const encryptionKey = await getEncryptionKey();
  const store = new Conf({ encryptionKey, configName });
  return store;
};

// TODO: refactor these methods if possible?
export const saveData = async (key: string, data: string | number) => {
  let store = await getStore();
  store.set(key, data);
};

export const getData = async (key: string) => {
  let store = await getStore();
  return store.get(key) as string;
};

export const hasData = async (key: string) => {
  let store = await getStore();
  return store.has(key) as boolean;
};

export const deleteData = async (key: string) => {
  let store = await getStore();
  store.delete(key);
  return `${key} was deleted from the store.`;
};

export const deleteAllData = async () => {
  let store = await getStore();
  store.clear();
  return 'The entire store has been deleted.';
};
