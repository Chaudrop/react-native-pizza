import React from 'react';
import { Button, Text, View } from 'react-native';
import AuthContext from '../context';

function Profile() {
  const context = React.useContext(AuthContext);
  const { signOut } = context;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Here you can see and edit your profile</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

export default Profile;
