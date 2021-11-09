import React from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import Router from './src/router';

export default function App() {
  return (
    <RootSiblingParent>
      <Router />
    </RootSiblingParent>
  );
}
