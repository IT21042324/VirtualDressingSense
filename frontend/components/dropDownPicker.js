import { SelectList } from "react-native-dropdown-select-list";
import { useState } from "react";

export const DropDown = ({
  data,
  searchBoolean,
  onSelectFunction,
  placeholder,
}) => {
  const [selected, setSelected] = useState([]);

  return (
    <SelectList
      setSelected={(val) => setSelected(val)}
      data={data}
      save="value"
      onSelect={() => onSelectFunction(selected)}
      search={searchBoolean}
      placeholder={placeholder}
      boxStyles={{
        borderWidth: 1,
        padding: 10,
        fontSize: 18,
        borderRadius: 5,
        borderColor: "black",
        marginTop: 20,
      }}
    />
  );
};
