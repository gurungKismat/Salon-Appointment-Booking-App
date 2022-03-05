// import React from 'react';
// import {
//   Alert,
//   HStack,
//   VStack,
//   Stack,
//   Text,
//   IconButton,
//   CloseIcon,
// } from 'native-base';

// const AlertBox = props => (
//   <Stack p="4">
//     <Alert h="45%" w="100%" status={props.status}>
//       <VStack space={2} flexShrink={1} w="100%">
//         <HStack flexShrink={1} space={2} justifyContent="space-between">
//           <HStack space={4} flexShrink={1}>
//             <Alert.Icon mt="1" />
//             <Text fontSize="md" color="coolGray.800">
//               Invalid UserName
//             </Text>
//           </HStack>
//           <IconButton
//             onPress={() => alert('hello')}
//             variant="unstyled"
//             icon={<CloseIcon size="3" color="coolGray.600" />}
//           />
//         </HStack>
//       </VStack>
//     </Alert>
//   </Stack>
// );

// export default AlertBox;


import React from 'react';
import {
  Alert,
  AlertDialog,
  Button,
  Center,
  NativeBaseProvider,
  HStack,
  VStack,
  Text,
  Box,
  IconButton,
  CloseIcon,
} from 'native-base';

const Example = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);
  return (
    <Center>
      <Button colorScheme="danger" onPress={() => setIsOpen(!isOpen)}>
        Delete Customer
      </Button>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <Alert w="100%" maxW="400" status={props.status} colorScheme="info">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack
                flexShrink={1}
                space={2}
                alignItems="center"
                justifyContent="space-between">
                <HStack flexShrink={1} space={2} alignItems="center" justifyContent="center">
                  <Alert.Icon />
                  <Text fontSize="md" color="coolGray.800">
                    We are going live in July!
                  </Text>
                </HStack>
                <IconButton
                onPress={onClose}
                
                  variant="unstyled"
                  icon={<CloseIcon size="3" color="coolGray.600" />}
                />
              </HStack>
          
            </VStack>
          </Alert>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Example />
      </Center>
    </NativeBaseProvider>
  );
};
