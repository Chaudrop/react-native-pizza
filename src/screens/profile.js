import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import Toast from 'react-native-root-toast';
import AuthContext from '../context';
import firebase from '../firebase/config';
import defaultImage from '../../assets/default.jpg';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#e63022',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#e63022',
  },
  buttonContainerDisabled: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#e89d97',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

function Profile() {
  const context = React.useContext(AuthContext);
  const { signOut, changeUserProfileImage } = context;
  const [uploading, setUploading] = React.useState(false);

  const getPictureBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  };

  const changeProfileImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        return Toast.show('You need to enable camera access');
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) {
      return null;
    }

    const storage = firebase.storage();
    let blob;
    try {
      setUploading(true);
      blob = await getPictureBlob(result.uri);

      const ref = await storage.ref().child(uuidv4());
      const snapshot = await ref.put(blob);

      const imageLink = await snapshot.ref.getDownloadURL();
      blob.close();
      const update = {
        photoURL: imageLink,
      };
      return firebase
        .firestore()
        .collection('users')
        .doc(context.state.user.id)
        .update(update)
        .then(() => {
          Toast.show('Profile photo successfully updated');
          setUploading(false);
          changeUserProfileImage(imageLink);
        })
        .catch((error) => {
          Toast.show(error.message);
          return setUploading(false);
        });
    } catch (error) {
      Toast.show(error.message);
      return setUploading(false);
    }
  };

  if (context.state.user === null) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <Image
        style={styles.avatar}
        source={context.state.user.photoURL ? { uri: context.state.user.photoURL } : defaultImage}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{context.state.user.fullName}</Text>
          <TouchableOpacity
            style={!uploading ? styles.buttonContainer : styles.buttonContainerDisabled}
            onPress={changeProfileImage}
            disabled={uploading}
          >
            <Text style={styles.buttonText}>Change profile photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={signOut} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Profile;
