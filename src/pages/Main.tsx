/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt_decode from 'jwt-decode';
import { getUser } from '../../api/user';

function Main({ route }) {
  useEffect(() => {
    if (route?.params) {
      const decoded: any = jwt_decode(route.params.userToken);
      getUser(decoded.user.id, route.params.userToken).then((res) => res).catch((err) => err);
    }
  }, []);

  return (
    <>
    </>
  );
}
export default Main;
