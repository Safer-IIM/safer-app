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
  TextInput,
  Button,
} from "react-native-paper";
import DialogContent from "react-native-paper/lib/typescript/components/Dialog/DialogContent";

type ContactType = {
  name: string;
  email: string;
};
type ContactProps = {
  contacts: Array<ContactType>;
};

const Contact = ({ contacts = [] }: ContactProps) => {
  const [addingContactVisible, setAddingContactVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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

      <Portal>
        <Dialog
          visible={addingContactVisible}
          onDismiss={() => setAddingContactVisible(false)}
        >
          <Dialog.Title>Ajouter un contacts</Dialog.Title>
          <Dialog.Content>
            <Text>Ajouter soit un email ou un numero de telephone</Text>
            <TextInput
              label="Email"
              onChangeText={(e) => setEmail(e)}
              //secureTextEntry
              right={<TextInput.Icon icon="email" />}
            />
            <TextInput
              label="Telephone"
              onChangeText={(e) => setPhone(e)}
              //secureTextEntry
              right={<TextInput.Icon icon="phone" />}
            />
            <Button mode="contained">Valider</Button>
          </Dialog.Content>
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
    </View>
  );
};

export default Contact;

Contact.propTypes = {
  contacts: PropTypes.array,
};
