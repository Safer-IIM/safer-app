import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { getData, removeData, storeData } from '../../utils/store';

function Account({ navigation }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    (async () => {
      const userInfos = await getData('@userInfo');
      setUserData(userInfos);
    })();
  }, []);

  return (
    <View>
      {userData
        ? (
          <View>
            <Text>
              {userData.name}

              {userData.email}
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
            </Text>
          </View>
        ) : <View />}
    </View>
  );
}

export default Account;
