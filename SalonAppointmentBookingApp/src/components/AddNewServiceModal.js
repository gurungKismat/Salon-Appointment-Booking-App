import React, {useState, useEffect} from 'react';
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
  Select,
  CheckIcon,
  useToast,
} from 'native-base';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CategoryList from '../components/CategoryList';

const AddNewServiceModal = props => {
  const toast = useToast();
  const id = 'test-toast';
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
    setCategoryError({isError: false});
    setServiceNameError({isError: false});
    setPriceError({isError: false});
    setDurationError({isError: false});
  };
  const saveData = async data => {
    const docRef = firestore()
      .collection('salonServices')
      .doc(auth().currentUser.uid);

    var countCategoryExist = 0;

    // checks whether the category is already in the data and adds the service in the specific category if exist
    function updateCategory(value, index, initialData) {
      if (categoryTitle.toLowerCase() === value.categoryTitle.toLowerCase()) {
        countCategoryExist++;
        initialData[index].data.push({
          serviceName: serviceName,
          price: price,
          duration: duration + ' ' + time,
        });
      }
    }

    await docRef.get().then(documentSnapshot => {
      if (!documentSnapshot.exists) {
        // if the salon service is added for the first time
        docRef
          .set(
            {
              data: firestore.FieldValue.arrayUnion(data),
            },
            // {merge: true},
          )
          .then(() => {
            displayToast();
          });
      } else {
        // if the salon services is already added then update the service
        const servicesList = documentSnapshot.data();
        const services = servicesList.data;
        services.forEach(updateCategory);

        // if category already exist add the service name in that category or else add the whole category and service
        if (countCategoryExist === 0) {
          services.push({
            categoryTitle: categoryTitle,
            data: [
              {
                serviceName: serviceName,
                price: price,
                duration: duration + ' ' + time,
              },
            ],
          });
        }
        docRef
          .set({
            data: firestore.FieldValue.arrayUnion(...services),
          })
          .then(() => {
            displayToast();
          });
      }
    });
  };

  // display toast after adding new service
  const displayToast = () => {
    if (!toast.isActive(id)) {
      toast.show({
        id,
        title: 'Service Added',
        status: 'success',
        placement: 'bottom',
      });
    }
  };

  // add new service to the firestore database
  const addService = () => {
    const result = isEmpty();
    if (!result) {
      const data = {
        categoryTitle: categoryTitle,
        data: [
          {
            serviceName: serviceName,
            price: price,
            duration: duration + ' ' + time,
          },
        ],
      };
      saveData(data);
      //
      //  setServicesData(data);
      // console.log(`Services data: ${JSON.stringify(servicesData)}`);
    }
  };

  // check if the textinput values are empty or not
  const isEmpty = () => {
    let countError = 0;

    if (categoryTitle.length === 0) {
      // console.log('category empty');
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
      // console.log('servicename empty');
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
      // console.log('price empty');
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
      // console.log('duration empty');
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
      // console.log('all good');
      return false;

      //   setServicesData({});
    } else {
      return true;
    }
  };

  // useEffect(() => {
  //   saveData();
  // }, [servicesData]);

  // useEffect(() => {
  //   console.log('use effect called');
  //   console.log('services data: ' + JSON.stringify(servicesData));
  //   // userDetail();
  //   saveData();
  // }, [servicesData]);

  // if (loading) {
  //   return null;
  // }

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
                <CategoryList
                  category={categoryTitle}
                  setCategory={setCategoryTitle}
                />
              </FormControl>
            ) : (
              <FormControl isInvalid>
                <FormControl.Label>Category</FormControl.Label>
                <CategoryList
                  category={categoryTitle}
                  setCategory={setCategoryTitle}
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
                onPress={addService}>
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
