import { Formik } from "formik";
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useState } from "react";
import * as yup from "yup";
import { globalStyles } from "../../styles/global";
import { UseUserContext } from "../../hooks/useUserContext";
import { colorVariants, fontFamily } from "../../global/string";

const StoreSchema = yup.object({
  storeName: yup.string().required().min(4, "Please enter a valid store name"),
  address: yup.string().required().min(4, "Please enter a valid store address"),
  owner: yup.string().required(),
});

export const AddStoreForm = ({ changeVisibility, storeUpdateStatus }) => {
  const REACT_APP_BACKEND_URL = "https://virtualdressingsense.onrender.com";

  const { user } = UseUserContext();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Zjc0M2UwNDAzNzQxZDQzNmMxZTZiZSIsImlhdCI6MTY5MzkyNjM2OCwiZXhwIjoxNjk0MTg1NTY4fQ.S5gfmagFa3zWtUlTyMbTpxEum8JfMLg8ufEJC0rRroU";

  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  const onSubmitHandler = async (values) => {
    try {
      setShowActivityIndicator(true);
      const { data } = await axios.post(
        `${REACT_APP_BACKEND_URL}/api/stores/`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Toast.show({
        type: "success",
        text1: "Store Registered Successfully",
      });

      storeUpdateStatus();
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Store Registration Failed",
        text2: err.message,
      });
    }
    changeVisibility(false);
  };
  return (
    <Formik
      initialValues={{
        owner: user.ownerId,
        storeName: "",
        address: "",
      }}
      validationSchema={StoreSchema}
      onSubmit={(values, actions) => {
        actions.resetForm();
        onSubmitHandler(values);
      }}
    >
      {(props) => {
        return (
          <View style={{ margin: 0 }}>
            <TextInput
              style={styles.textInput}
              placeholder="Store Name"
              onChangeText={props.handleChange("storeName")}
              value={props.values.storeName}
              onBlur={props.handleBlur("storeName")}
            />

            <Text style={globalStyles.errorText}>
              {props.touched.storeName && props.errors.storeName}
            </Text>

            <TextInput
              multiline
              style={styles.textInput}
              placeholder="Address"
              onChangeText={props.handleChange("address")}
              value={props.values.address}
              onBlur={props.handleBlur("address")}
            />

            <Text style={globalStyles.errorText}>
              {props.touched.address && props.errors.address}
            </Text>

            <View style={{ marginTop: 20 }}>
              {!showActivityIndicator ? (
                <Button
                  title="Register"
                  color={colorVariants.turquesa}
                  onPress={props.handleSubmit}
                />
              ) : (
                <ActivityIndicator
                  size="medium"
                  color={colorVariants.turquesa}
                />
              )}
            </View>
          </View>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    borderRadius: 5,
    marginTop: 20,
    fontFamily: fontFamily.normalText,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: fontFamily.normalText,
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
});
