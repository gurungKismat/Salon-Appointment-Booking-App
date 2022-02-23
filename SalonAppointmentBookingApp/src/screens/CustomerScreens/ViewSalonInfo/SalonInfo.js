// import React from 'react';
// import {
//   Box,
//   Center,
//   Text,
//   Stack,
//   AspectRatio,
//   Image,
//   Heading,
// } from 'native-base';
// import {Rating} from 'react-native-ratings';
// import CustomTabBar from '../../../components/CustomTabbar';

import TabBarr from "../../../components/TabBar";


// const SalonInfoUi = () => {
//   function ratingCompleted(rating) {
//     console.log('Rating is: ' + rating);
//   }

//   return (
//     <Stack flex={1}>
//       <Stack space={2} flex={1}>
//         <Box>
//           <AspectRatio w="100%" ratio={16 / 9}>
//             <Image
//               source={{
//                 uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
//               }}
//               alt="image"
//             />
//           </AspectRatio>
//         </Box>

//         <Stack
//           space={2}
//           bg="white"
//           direction="column"
//           px={4}
//           rounded="lg"
//           m="2">
//           <Stack direction={'row'} justifyContent="space-between">
//             <Heading size="md">Reaver Salon</Heading>

//             <Rating
//               type="custom"
//               showRating={false}
//               imageSize={25}
//               onFinishRating={ratingCompleted}
//               tintColor="white"
//               readonly={true}
//             />
//           </Stack>
//           <Stack space={1}>
//             <Text fontSize="md">Naxal, Kathmandu</Text>
//             <Text fontSize="md">Available Time: 9:00 AM to 5:00 PM</Text>
//           </Stack>
//         </Stack>
//       </Stack>

//       <Stack flex={1}>
//         <CustomTabBar />
//       </Stack>
//     </Stack>
//   );
// };

// const SalonInfo = () => {
//   return (
//     <Box flex={1}>
//       <SalonInfoUi />
//     </Box>
//   );
// };

// export default SalonInfo;

import React from 'react';

const SalonInfo = () => {
  return <TabBarr />;
};

export default SalonInfo;
