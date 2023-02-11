/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt_decode from 'jwt-decode';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { getUser } from '../../api/user';
import AlertButton from '../components/AlertButton';
import styles from '../../styles/home';
import { getData, storeData } from '../../utils/store';

function Main({ route, navigation }) {
  const [isUserConnected, setIsUserConnected] = useState(false);

  useEffect(() => {
    if (route?.params) {
      const decoded: any = jwt_decode(route.params.userToken);
      getUser(decoded.user.id, route.params.userToken)
        .then((res) => {
          setIsUserConnected(true);
          return res;
        })
        .catch((err) => err);
    }
  }, []);

  return (
    <View style={styles.mainContainer}>
      {isUserConnected ? (
        <Button
          style={styles.accountButton}
          icon="account"
          textColor="black"
          onPress={() => {
            navigation.navigate('Account');
          }}
        >
          Account
        </Button>
      ) : (
        <Button
          style={styles.accountButton}
          icon="account-question"
          textColor="black"
          onPress={() => {
            navigation.navigate('Inscription');
          }}
        >
          <></>
        </Button>
      )}
      <AlertButton navigation={navigation} />
    </View>
  );
}

export default Main;
