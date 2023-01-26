import firebase from 'firebase';
import { Platform, InteractionManager } from 'react-native';

const firebaseConfig = {
  apiKey: '',
  authDomain: 'react-native-pizza.firebaseapp.com',
  databaseURL: 'https://react-native-pizza.firebaseio.com',
  projectId: 'react-native-pizza',
  storageBucket: 'react-native-pizza.appspot.com',
  messagingSenderId: '351099682322',
  appId: '1:351099682322:android:ebd8777050a777237ce2cb',
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

// "Setting a timer for a long period of time" warning fix
const newSetTimeout = global.setTimeout;
const newClearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
  const timerFix = {};
  const runTask = (id, fn, ttl, args) => {
    const waitingTime = ttl - Date.now();
    if (waitingTime <= 1) {
      InteractionManager.runAfterInteractions(() => {
        if (!timerFix[id]) {
          return;
        }
        delete timerFix[id];
        fn(...args);
      });
      return;
    }

    const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
    timerFix[id] = newSetTimeout(() => runTask(id, fn, ttl, args), afterTime);
  };

  global.setTimeout = (fn, time, ...args) => {
    if (MAX_TIMER_DURATION_MS < time) {
      const ttl = Date.now() + time;
      const id = `_lt_${Object.keys(timerFix).length}`;
      runTask(id, fn, ttl, args);
      return id;
    }
    return newSetTimeout(fn, time, ...args);
  };

  global.clearTimeout = (id) => {
    if (typeof id === 'string' && id.startsWith('_lt_')) {
      newClearTimeout(timerFix[id]);
      delete timerFix[id];
      return;
    }
    newClearTimeout(id);
  };
}

export default app;
