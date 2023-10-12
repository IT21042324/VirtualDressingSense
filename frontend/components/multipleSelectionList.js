import { MultipleSelectList } from "react-native-dropdown-select-list";
import React from "react";
import { colorVariants } from "../global/string";

export const MultiSelectionDropDown = ({
  data,
  label,
  onSelectFunction,
  placeholder,
}) => {
  const [selected, setSelected] = React.useState([]);

  return (
    <MultipleSelectList
      setSelected={(val) => setSelected(val)}
      data={data}
      save="value"
      onSelect={() => onSelectFunction(selected)}
      label={label}
      placeholder={placeholder}
      boxStyles={{
        borderWidth: 1,
        padding: 10,
        fontSize: 18,
        borderRadius: 5,
        borderColor: colorVariants.mediumAquaMarine,
        marginTop: 20,
      }}
    />
  );
};
