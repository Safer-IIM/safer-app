import { useState } from "react";
import PropTypes from "prop-types";
import styles from "../../styles/contact";
import { Animated, Text, View, Linking, Pressable } from "react-native";
import {
  List,
  MD3Colors,
  IconButton,
  Portal,
  Dialog,
} from "react-native-paper";

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
    <>
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

      <Portal>
        <Dialog
          visible={addingContactVisible}
          onDismiss={() => setAddingContactVisible(false)}
        >
          <Dialog.Title>Ajouter un contacts</Dialog.Title>
        </Dialog>
      </Portal>

      <IconButton
        icon="plus"
        mode="outlined"
        style={styles.addContactButtons}
        iconColor={MD3Colors.error50}
        size={20}
        onPress={() => setAddingContactVisible(true)}
      />
    </>
  );
};

export default Contact;

Contact.propTypes = {
  contacts: PropTypes.array,
};
