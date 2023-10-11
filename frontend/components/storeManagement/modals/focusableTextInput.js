import { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { colorVariants } from "../../../global/string";

export const FocusableTextInput = ({ field, form, keyboardType, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      style={[
        styles.textInput,
        {
          borderColor: isFocused ? "dodgerblue" : colorVariants.black,
          borderWidth: isFocused ? 2 : 1,
        },
      ]}
      onChangeText={form.handleChange(field)}
      onBlur={() => {
        form.handleBlur(field);
        setIsFocused(false);
      }}
      onFocus={() => setIsFocused(true)}
      value={form.values[field]}
      {...props}
      keyboardType={keyboardType || "default"}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    marginTop: 20,
  },
});
