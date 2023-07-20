import { Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import styles from '../../styles/contact';
import { getData, storeData } from '../../utils/store';
import { postContact } from '../../api/contact';

function ContactForm({ onValidate }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const addContact = async () => {
    const token = await getData('@userToken', 'string');
    const userInfo = await getData('@userInfo');
    postContact(token, userInfo.user.id, [email])
      .then((res) => {
        onValidate(res.data.contacts);
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
        label="Prenom"
        onChangeText={(e) => setName(e)}
            // secureTextEntry
        right={<TextInput.Icon icon="account" />}
      />
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
        }}
      >
        Valider
      </Button>
    </>
  );
}
export default ContactForm;
