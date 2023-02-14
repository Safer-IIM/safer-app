import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { getData, removeData, storeData } from '../../utils/store';
import styles from '../../styles/account';

function Account({ navigation }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    (async () => {
      const userInfos = await getData('@userInfo');
      setUserData(userInfos);
    })();
  }, []);

  return (

    userData
      ? (
        <View style={styles.accountContainer}>

          <TextInput
            style={styles.accountInput}
            label="Nom"
            value={userData.name}
            onChangeText={(text) => console.log('text')}
          />
          <TextInput
            style={styles.accountInput}
            label="Email"
            value={userData.email}
            onChangeText={(text) => console.log('text')}
          />

          <Button
            style={styles.accountButton}
            disabled
            mode="contained"
            onPress={async () => {
            }}
          >
            Sauvegarder les modification
          </Button>

          <Button
            style={styles.accountButton}
            mode="contained"
            onPress={async () => {
              await removeData('@userInfo');
              await removeData('@userToken');
              await storeData('@isConnected', false);
              navigation.navigate('Main');
            }}
          >
            Déconnexion
          </Button>

        </View>
      ) : <View />
  );
}

export default Account;
