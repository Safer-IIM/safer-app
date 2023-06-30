import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Pressable, Text } from 'react-native';
import {
  Dialog, IconButton, Portal, Chip, Tooltip,
} from 'react-native-paper';

import { AntDesign } from '@expo/vector-icons';
import { getData } from '../../../utils/store';
import Contact from './Contact';
import styles from '../../../styles/home';
import { Context } from '../../context';

function ContactModal() {
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [contactModalInfoVisible, setContactModalInfoVisible] = useState(false);
  const [contactList, setContactList] = useState([]);
  const context = useContext(Context);
  const {
    isAuthenticatedState,
  } = context;

  useEffect(() => {
    (async function () {
      const userInfo = await getData('@userInfo');
      userInfo.user && setContactList(userInfo.user.contacts);
    }());
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
          <Dialog.Content style={{ maxHeight: '90%' }}>
            <Contact contactList={contactList} setContactList={setContactList} />
            {!isAuthenticatedState && (
              <Chip
                style={{
                  backgroundColor: '#ffeae5',
                }}
                textStyle={{
                  color: '#ff5e00',
                }}
              >
                Vous n'êtes pas connecté, si vous effacez les données de l'application
                vous perdrez de perdre vos contact enregistré
              </Chip>
            )}
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
}

export default ContactModal;
