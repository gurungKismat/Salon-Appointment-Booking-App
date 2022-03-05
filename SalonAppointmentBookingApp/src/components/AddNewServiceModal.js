import React, {useState} from 'react';
import {
  Button,
  Modal,
  FormControl,
  Input,
  Center,
  HStack,
  Radio,
  WarningOutlineIcon,
  Stack,
} from 'native-base';

const AddNewServiceModal = props => {
  const [servicesData, setServicesData] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [time, setTime] = useState('Min');
  const [categoryError, setCategoryError] = useState({
    error: '',
    isError: false,
  });

  const [serviceNameError, setServiceNameError] = useState({
    error: '',
    isError: false,
  });

  const [priceError, setPriceError] = useState({
    error: '',
    isError: false,
  });

  const [durationError, setDurationError] = useState({
    error: '',
    isError: false,
  });

  // clears the text from the input field
  const clearText = () => {
    setCategoryTitle('');
    setServiceName('');
    setPrice('');
    setDuration('');
  };

  // check if the textinput values are empty or not
  const isEmpty = () => {
    let countError = 0;

    if (categoryTitle.length === 0) {
      console.log('category empty');
      countError++;
      const newError = {
        error: 'Category title can not be empty',
        isError: true,
      };

      setCategoryError({
        ...categoryError,
        ...newError,
      });
    } else {
      const updatedValue = {
        error: '',
        isError: false,
      };

      setCategoryError({
        ...categoryError,
        ...updatedValue,
      });
    }

    if (serviceName.length === 0) {
      console.log('servicename empty');
      countError++;
      const newError = {
        error: 'Service name can not be empty',
        isError: true,
      };

      setServiceNameError({
        ...serviceNameError,
        ...newError,
      });
    } else {
      const updatedValue = {
        error: '',
        isError: false,
      };

      setServiceNameError({
        ...serviceNameError,
        ...updatedValue,
      });
    }

    if (price.length === 0) {
      console.log('price empty');
      countError++;
      const newError = {
        error: 'Price can not be empty',
        isError: true,
      };

      setPriceError({
        ...priceError,
        ...newError,
      });
    } else {
      const updatedValue = {
        error: '',
        isError: false,
      };

      setPriceError({
        ...priceError,
        ...updatedValue,
      });
    }

    if (duration.length === 0) {
      console.log('duration empty');
      countError++;

      const newError = {
        error: 'Duration can not be empty',
        isError: true,
      };

      setDurationError({
        ...durationError,
        ...newError,
      });
    } else {
      const updatedValue = {
        error: '',
        isError: false,
      };

      setDurationError({
        ...durationError,
        ...updatedValue,
      });
    }

    if (countError === 0) {
      console.log('all good');
        const data = {
            categoryTitle: categoryTitle,
            data: [{
                serviceName: serviceName, price: price, duration: duration
            }]
        }
        setServicesData(data);
        console.log(`Services data: ${JSON.stringify(servicesData)}`)
    //   setServicesData({});
    } else {
      console.log('something wrong ' + countError);
    }

    console.log("after")
  };

  return (
    <Center>
      <Modal isOpen={props.showModal} onClose={props.setShowModal} size="md">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Add New Services</Modal.Header>
          <Modal.Body>
            {!categoryError.isError ? (
              <FormControl>
                <FormControl.Label>Category</FormControl.Label>
                <Input
                  onChangeText={setCategoryTitle}
                  value={categoryTitle}
                  placeholder="Category"
                />
              </FormControl>
            ) : (
              <FormControl isInvalid>
                <FormControl.Label>Category</FormControl.Label>
                <Input
                  onChangeText={setCategoryTitle}
                  value={categoryTitle}
                  placeholder="Category"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {categoryError.error}
                </FormControl.ErrorMessage>
              </FormControl>
            )}

            {!serviceNameError.isError ? (
              <FormControl mt="3">
                <FormControl.Label>Service Name</FormControl.Label>
                <Input
                  onChangeText={setServiceName}
                  value={serviceName}
                  placeholder="Service Name"
                />
              </FormControl>
            ) : (
              <FormControl isInvalid>
                <FormControl.Label>Service Name</FormControl.Label>
                <Input
                  onChangeText={setServiceName}
                  value={serviceName}
                  placeholder="Service Name"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {serviceNameError.error}
                </FormControl.ErrorMessage>
              </FormControl>
            )}

            {!priceError.isError ? (
              <FormControl mt="3">
                <FormControl.Label>Price</FormControl.Label>
                <Input
                  onChangeText={setPrice}
                  value={price}
                  placeholder="Price"
                  keyboardType="numeric"
                />
              </FormControl>
            ) : (
              <FormControl isInvalid>
                <FormControl.Label>Price</FormControl.Label>
                <Input
                  onChangeText={setPrice}
                  value={price}
                  placeholder="Price"
                  keyboardType="numeric"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {priceError.error}
                </FormControl.ErrorMessage>
              </FormControl>
            )}
            {!durationError.isError ? (
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
                    onChange={val => setTime(val)}>
                    <Radio value="Min" my={1}>
                      Min
                    </Radio>
                    <Radio value="Hr" my={1}>
                      Hr
                    </Radio>
                  </Radio.Group>
                </HStack>
              </FormControl>
            ) : (
              <FormControl isInvalid>
                <FormControl.Label>Duration</FormControl.Label>
                <HStack space="4">
                  <Stack>
                    <Input
                      width="48"
                      onChangeText={setDuration}
                      value={duration}
                      placeholder="Duration"
                      keyboardType="numeric"
                    />
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}>
                      {durationError.error}
                    </FormControl.ErrorMessage>
                  </Stack>
                  <Stack>
                    <Radio.Group
                      value={time}
                      name="myRadioGroup"
                      accessibilityLabel="Pick Time"
                      onChange={val => setTime(val)}>
                      <Radio value="Min" my={1}>
                        Min
                      </Radio>
                      <Radio value="Hr">Hr</Radio>
                    </Radio.Group>
                  </Stack>
                </HStack>
              </FormControl>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="subtle"
                colorScheme="secondary"
                onPress={clearText}>
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
                // onPress={() => {
                //   props.setShowModal(false);
                // }}>
                onPress={isEmpty}>
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
