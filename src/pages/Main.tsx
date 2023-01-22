/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { getUser } from '../../api/user';

function Main({ route, navigation }) {
  useEffect(() => {
    console.log('navigation :', navigation);
    if (route?.params) {
      console.log(route.params.userToken);
      getUser(route.params.userId, route.params.userToken);
    }
  }, []);
  return (
    <>
    </>
  );
}
export default Main;
