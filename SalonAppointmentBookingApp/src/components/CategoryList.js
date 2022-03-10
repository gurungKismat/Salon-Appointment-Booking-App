import React from 'react';
import {Select, CheckIcon, Box} from 'native-base';

const CategoryList = props => {
  return (
    <Box>
      <Select
        selectedValue={props.category}
        minWidth="200"
        accessibilityLabel="Choose Category"
        placeholder="Choose Category"
        _selectedItem={{
          bg: 'teal.600',
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={props.setCategory}>
        <Select.Item label="HairCut" value="haircut" />
        <Select.Item label="Massage" value="massage" />
        <Select.Item label="SkinCare" value="skincare" />
        <Select.Item label="Nails" value="nails" />
      </Select>
    </Box>
  );
};

export default CategoryList;
