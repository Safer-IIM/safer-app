import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
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
          <Text>
            {userData.name}
          </Text>
          <Text>
            {userData.email}
          </Text>
          <Button
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
