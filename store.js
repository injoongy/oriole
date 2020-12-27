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
  const store = new Conf({ encryptionKey, configName });
  return store;
};

const saveData = async (label, data) => {
  let store = await getStore();
  store.set(label, data);
};

const getData = async label => {
  let store = await getStore();
  return store.get(label);
};

export { saveData, getData };
