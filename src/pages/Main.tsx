/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt_decode from 'jwt-decode';
import { getUser } from '../../api/user';
import AlertButton from '../components/AlertButton';

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
    isUserConnected ? (
      <AlertButton navigation={navigation} />
    ) : (
      <AlertButton navigation={navigation} />
    )
  );
}

export default Main;
