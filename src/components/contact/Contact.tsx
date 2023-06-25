import React, { useState } from 'react';
import { View } from 'react-native';
import {
  List,
  IconButton,
  Portal,
  Dialog,
} from 'react-native-paper';
import styles from '../../../styles/contact';
import ContactForm from '../ContactForm';

type ContactType = {
  name: string;
  email: string;
};
type ContactProps = {
  contactList: Array<ContactType>;
};

function Contact({ contactList = [] }: ContactProps) {
  const [addingContactVisible, setAddingContactVisible] = useState(false);
  return (
    <View style={styles.contactContainer}>
      <List.Section style={styles.listContainer}>
        {contactList.map((contact) => (
          <List.Item
            title={contact}
            left={() => <List.Icon icon="email" />}
          />
        ))}
      </List.Section>

      <IconButton
        icon="plus"
        mode="outlined"
        style={styles.addContactButtons}
        // iconColor={MD3Colors.error50}
        size={20}
        onPress={() => setAddingContactVisible(true)}
      />

      <Portal>
        <Dialog
          visible={addingContactVisible}
          onDismiss={() => setAddingContactVisible(false)}
        >
          <Dialog.Title>Ajouter un contact</Dialog.Title>
          <Dialog.Content>
            <ContactForm onValidate={() => setAddingContactVisible(false)} />
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
}

export default Contact;
