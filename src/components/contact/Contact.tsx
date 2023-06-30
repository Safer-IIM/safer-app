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
};

function Contact({ contactList = [] }: ContactProps) {
  const [addingContactVisible, setAddingContactVisible] = useState(false);
  const [screenHeight, setScreenHeight] = useState(0);
  // const { height } = Dimensions.get('window');
  const scrollEnabled = screenHeight > height;
  const onContentSizeChange = (contentWidth, contentHeight) => {
    setScreenHeight(contentHeight);
  };

  return (
    <View style={styles.contactContainer}>
      <ScrollView
        style={styles.listContainer}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={onContentSizeChange}
      >
        {contactList.map((contact, index) => (
          <View
            style={styles.item}
            key={index}
          >
            <View style={styles.itemMail}>
              <List.Icon icon="email" />
              <Text>{contact}</Text>
            </View>
            <View style={styles.itemPhone}>
              <List.Icon icon="phone" />
              <Text>{contact}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

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
