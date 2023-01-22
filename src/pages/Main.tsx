import { useEffect } from "react";
import { getData } from "../../utils/store";

const Main = ({ route, navigation }) => {
  useEffect(() => {
    if (route?.params) {
      console.log(route.params.userToken);
    }
  }, []);
  return <></>;
};
export default Main;
