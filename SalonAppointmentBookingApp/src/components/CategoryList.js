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
        <Select.Item label="HairCut" value="Haircut" />
        <Select.Item label="Massage" value="Massage" />
        <Select.Item label="SkinCare" value="Skincare" />
        <Select.Item label="Nails" value="Nails" />
      </Select>
    </Box>
  );
};

export default CategoryList;
