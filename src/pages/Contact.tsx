import { useState } from "react";
import PropTypes from "prop-types";
import styles from "../../styles/contact";
import { Animated, Text, View, Linking, Pressable } from "react-native";
import jwt_decode from "jwt-decode";
import {
  List,
  MD3Colors,
  IconButton,
  Portal,
  Dialog,
  TextInput,
  Button,
  Tooltip,
} from "react-native-paper";
import DialogContent from "react-native-paper/lib/typescript/components/Dialog/DialogContent";
import { postContact } from "../../api/contact";
import { getData } from "../../utils/store";
import ContactForm from "../components/ContactForm";

type ContactType = {
  name: string;
  email: string;
};
type ContactProps = {
  contacts: Array<ContactType>;
};

const Contact = ({ contacts = [] }: ContactProps) => {
  const [addingContactVisible, setAddingContactVisible] = useState(false);
  return (
    <View style={styles.contactContainer}>
      <List.Section>
        {contacts.map((contact) => {
          return (
            <>
              <List.Item
                title={contact.name}
                left={() => <List.Icon icon="email" />}
              />
            </>
          );
        })}
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
            <ContactForm />
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

export default Contact;

Contact.propTypes = {
  contacts: PropTypes.array,
};
