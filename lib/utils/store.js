import keytar from 'keytar';
import crypto from 'crypto';
import Conf from 'conf';

const configName = 'orioleStore';

const getKey = async () => {
  const encryptionKey = await keytar.getPassword('oriole', 'secret');
  if (!encryptionKey) {
    const newEncryptionKey = crypto.randomBytes(256).toString('base64');
    keytar.setPassword('oriole', 'secret', newEncryptionKey);
    return newEncryptionKey;
  }
  return encryptionKey;
};

const getStore = async () => {
  const encryptionKey = await getKey();
  const store = new Conf({ configName }); // TODO: add encryptionKey back
  return store;
};

// TODO: refactor these methods if possible?
const saveData = async (key, data) => {
  let store = await getStore();
  store.set(key, data);
};

const getData = async key => {
  let store = await getStore();
  return store.get(key);
};

const hasData = async key => {
  let store = await getStore();
  return store.has(key);
};

const deleteData = async key => {
  let store = await getStore();
  store.delete(key);
  return `${key} was deleted from the store.`;
};

const deleteAllData = async key => {
  let store = await getStore();
  store.clear();
  return 'The entire store has been deleted.';
};

export { saveData, getData, hasData, deleteData, deleteAllData };
