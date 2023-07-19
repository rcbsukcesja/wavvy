import { Modal } from 'native-base';
import { StyleSheet } from 'react-native';
import { Button } from 'src/components/Button';
import { FormControl } from 'src/components/Form/InputFormControl';
import { useCombinedStore } from 'src/store';

interface VolunteeringSignupProps {
  isVisible: boolean;
}

const styles = StyleSheet.create({
  modal: {
    marginBottom: 'auto',
    marginTop: 48,
  },
});

export function VolunteeringSignup({ isVisible }: VolunteeringSignupProps) {
  const hideForm = useCombinedStore(state => state.hideForm);

  // TODO : wysylanie zgloszenia
  const handleSignup = () => {
    console.log();
  };

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => hideForm()}
      safeAreaTop
      avoidKeyboard
      justifyContent="flex-end"
      bottom="4"
      size="lg">
      <Modal.Content style={styles.modal}>
        <Modal.CloseButton />
        <Modal.Header>Zgłoszenie wolontariatu</Modal.Header>
        <Modal.Body>
          Napisz kilka słów o sobie.
          <FormControl isRequired type="text" label="Wiadomość" isTextarea />
        </Modal.Body>
        <Modal.Footer>
          <Button
            label="Wyślij"
            handleOnPress={() => {
              hideForm();
            }}
          />
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
