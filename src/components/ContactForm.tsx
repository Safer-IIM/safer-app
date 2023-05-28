import { Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import styles from "../../styles/contact";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import { getData } from "../../utils/store";
import { postContact } from "../../api/contact";

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const addContact = async () => {
    const token = await getData("@userToken", "string");
    const decoded = jwt_decode(token);

    const resulatApiContact = await postContact(token, decoded.user.id, [
      email,
    ]);
    console.log(resulatApiContact);
  };

  return (
    <>
      <Text>Ajouter soit un email ou un numero de telephone</Text>
      <TextInput
        style={styles.contactInput}
        label="Email"
        onChangeText={(e) => setEmail(e)}
        //secureTextEntry
        right={<TextInput.Icon icon="email" />}
      />
      <TextInput
        style={styles.contactInput}
        label="Telephone"
        onChangeText={(e) => setPhone(e)}
        //secureTextEntry
        right={<TextInput.Icon icon="phone" />}
      />
      <Button mode="contained" onPress={() => addContact()}>
        Valider
      </Button>
    </>
  );
};
export default ContactForm;
