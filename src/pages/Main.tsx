import { useEffect } from "react";
import { getData } from "../../utils/store";
import { getUser } from "../../api/user";

const Main = ({ route, navigation }) => {
  useEffect(() => {
    if (route?.params) {
      console.log(route.params.userToken);
      getUser(route.params.userId, route.params.userToken);
    }
  }, []);
  return <></>;
};
export default Main;
