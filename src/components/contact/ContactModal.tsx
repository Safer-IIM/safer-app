import * as React from 'react';
import { useEffect, useState } from 'react';
import { Pressable, Text } from 'react-native';
import { Dialog, IconButton, Portal } from 'react-native-paper';

import { AntDesign } from '@expo/vector-icons';
import { getData } from '../../../utils/store';
import Contact from './Contact';
import styles from '../../../styles/home';

function ContactModal() {
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [contactModalInfoVisible, setContactModalInfoVisible] = useState(false);
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    getData('contactList')
      .then((res) => {
        console.log('res contact', res);
        res && setContactList(res.contacts);
      })
      .catch((err) => {
        console.log('err contact', err);
      });
  }, []);

  return (
    <>
      <Pressable
        style={styles.contactButton}
        onPress={() => setContactModalVisible(true)}
      >
        <AntDesign name="contacts" size={32} color="black" />
        <Text style={styles.contactButtonText}>Contact</Text>
      </Pressable>
      <Portal>
        <Dialog
          visible={contactModalVisible}
          onDismiss={() => setContactModalVisible(false)}
        >
          <Dialog.Title
            style={{
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Modifiez vos contacts
            <IconButton
              icon="information"
              selected
              size={24}
              onPress={() => setContactModalInfoVisible(true)}
            />
            <Portal>
              <Dialog
                visible={contactModalInfoVisible}
                onDismiss={() => setContactModalInfoVisible(false)}
              >
                <Dialog.Title>Infos</Dialog.Title>
                <Dialog.Content>
                  <Text>
                    Ces contacts seront réélement appelé ou notifié si vous
                    cliquez sur le bouton d'urgence durant un faux appel
                  </Text>
                </Dialog.Content>
              </Dialog>
            </Portal>
          </Dialog.Title>
          <Dialog.Content>
            <Contact contactList={contactList} />
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
}

export default ContactModal;
