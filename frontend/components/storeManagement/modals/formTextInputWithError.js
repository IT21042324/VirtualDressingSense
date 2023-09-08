import { TextInput, Text, StyleSheet } from "react-native";
import { globalStyles } from "../../../styles/global";

export const FormTextInput = ({ name, placeholder, ...props }) => {
  return (
    <>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        onChangeText={props.handleChange(name)}
        value={props.values[name]}
        onBlur={props.handleBlur(name)}
      />
      <Text style={globalStyles.errorText}>
        {props.touched[name] && props.errors[name]}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    borderRadius: 5,
    marginTop: 20,
  },
});
