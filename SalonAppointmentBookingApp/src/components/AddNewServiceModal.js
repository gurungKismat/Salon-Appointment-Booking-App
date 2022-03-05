import React, {useState} from 'react';
import {
  Button,
  Modal,
  FormControl,
  Input,
  Center,
  HStack,
  Radio,
} from 'native-base';

const AddNewServiceModal = props => {
  const [categoryTitle, setCategoryTitle] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');

  const [time, setTime] = useState('Min');

  return (
    <Center>
      <Modal isOpen={props.showModal} onClose={props.setShowModal} size="md">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Add New Services</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Category</FormControl.Label>
              <Input
                onChangeText={setCategoryTitle}
                value={categoryTitle}
                placeholder="Category"
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Service Name</FormControl.Label>
              <Input
                onChangeText={setServiceName}
                value={serviceName}
                placeholder="Service Name"
              />
            </FormControl>

            <FormControl mt="3">
              <FormControl.Label>Price</FormControl.Label>
              <Input
                onChangeText={setPrice}
                value={price}
                placeholder="Price"
                keyboardType="numeric"
              />
            </FormControl>

            <FormControl mt="3">
              <FormControl.Label>Duration</FormControl.Label>
              <HStack space="4">
                <Input
                  width="48"
                  onChangeText={setDuration}
                  value={duration}
                  placeholder="Duration"
                  keyboardType="numeric"
                />
                <Radio.Group
                  value={time}
                  name="myRadioGroup"
                  accessibilityLabel="Pick Time"
                  onChange={(val) => setTime(val)}>
                  <Radio value="Min" my={1}>
                    Min
                  </Radio>
                  <Radio value="Hr" my={1}>
                    Hr
                  </Radio>
                </Radio.Group>
              </HStack>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="outline"
                colorScheme="secondary"
                onPress={() => {
                  props.setShowModal(false);
                }}>
                Clear
              </Button>
              <Button
                variant="solid"
                colorScheme="secondary"
                onPress={() => {
                  props.setShowModal(false);
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  props.setShowModal(false);
                }}>
                Add
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default AddNewServiceModal;
