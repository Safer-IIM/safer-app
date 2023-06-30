import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
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
  setContactList: any
};

function Contact({ contactList = [], setContactList }: ContactProps) {
  const [addingContactVisible, setAddingContactVisible] = useState(false);

  return (
    <View style={styles.contactContainer}>
      <ScrollView
        style={styles.listContainer}
      >
        {contactList.map((contact, index) => (
          <View
            style={styles.item}
            key={index}
          >
            <View style={styles.itemMail}>
              <List.Icon icon="email" />
              <Text>
                {'   '}
              </Text>
              <Text>{contact}</Text>
            </View>
            <View style={styles.itemPhone}>
              <List.Icon icon="phone" />
              <Text>
                {'   '}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View
        style={styles.addContactButtonContainer}
      >
        <IconButton
          icon="plus"
          mode="outlined"
          style={styles.addContactButton}
        // iconColor={MD3Colors.error50}
          size={20}
          onPress={() => setAddingContactVisible(true)}
        />
      </View>
      <Portal>
        <Dialog
          visible={addingContactVisible}
          onDismiss={() => setAddingContactVisible(false)}
        >
          <Dialog.Title>Ajouter un contact</Dialog.Title>
          <Dialog.Content>
            <ContactForm onValidate={(res) => {
              setAddingContactVisible(false);
              setContactList(res);
            }}
            />
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
}

export default Contact;
