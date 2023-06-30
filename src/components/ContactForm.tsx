import { Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import styles from '../../styles/contact';
import { getData, storeData } from '../../utils/store';
import { postContact } from '../../api/contact';

function ContactForm({ onValidate }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const addContact = async () => {
    const token = await getData('@userToken', 'string');
    const userInfo = await getData('@userInfo');

    postContact(token, userInfo.id, [email])
      .then((res) => {
        console.log('res :', res.data);
        // storeData("contactList", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Text>Ajouter soit un email ou un numero de telephone</Text>
      <TextInput
        style={styles.contactInput}
        label="Email"
        onChangeText={(e) => setEmail(e)}
        // secureTextEntry
        right={<TextInput.Icon icon="email" />}
      />
      <TextInput
        style={styles.contactInput}
        label="Telephone"
        onChangeText={(e) => setPhone(e)}
        // secureTextEntry
        right={<TextInput.Icon icon="phone" />}
      />
      <Button
        mode="contained"
        onPress={async () => {
          await addContact();
          onValidate();
        }}
      >
        Valider
      </Button>
    </>
  );
}
export default ContactForm;
