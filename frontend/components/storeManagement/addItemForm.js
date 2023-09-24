import { Formik } from "formik";
import {
  Button,
  View,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Text,
  StyleSheet,
} from "react-native";
import { useRef, useState, useEffect } from "react";
import * as yup from "yup";
import { DropDown } from "../dropDownPicker";
import { globalStyles } from "../../styles/global";
import GlobalConstants from "../globalConstants";
import { MultiSelectionDropDown } from "../multipleSelectionList";
import Toast from "react-native-toast-message";
import { ImageUpload } from "./imageUpload";
import { UseStoreContext } from "../../hooks/useStoreContext";
import { createNewItem } from "../../services/api";
import { debounce } from "lodash";

const ItemSchema = yup.object({
  brandName: yup.string().required(),
  subType: yup.array().required(),
  mainType: yup.string().required(),
  size: yup.string().required(),
  itemName: yup.string().required(),
  gender: yup.string().required(),
  category: yup.string().required(),
  image: yup.string().required(),
});

const initialValues = {
  store: "",
  brandName: "",
  itemName: "",
  subType: [],
  mainType: "",
  image: "",
  size: "",
  gender: "",
  category: "teens",
};

export const AddItemForm = ({
  changeVisibility,
  storeId,
  itemUpdationStatus,
}) => {
  const {
    sizeSelectionOption,
    genderSelectionOptions,
    typeSelectionOption,
    mainTypeSelectionOption,
    categorySelectionOption,
  } = GlobalConstants;

  const debouncedTypeSelectionHandler = () => {
    debounce(typeSelectionHandler, 300);
  };

  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  const [selectedGender, setSelectedGender] = useState("male");
  const genderSelectionHandler = (gender) => {
    setSelectedGender(gender);
  };

  const { dispatch, stores } = UseStoreContext();

  const [selectedSize, setSelectedSize] = useState("");
  const sizeSelectionHandler = (size) => {
    setSelectedSize(size);
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const categorySelectionHandler = (category) => {
    setSelectedCategory(category);
  };

  const [selectedType, setSelectedType] = useState([]);

  const typeSelectionHandler = (subType) => {
    setSelectedType(subType);
  };

  const [selectedMainType, setSelectedMainType] = useState("");

  const mainTypeSelectionHandler = (type) => {
    setSelectedMainType(type);
  };

  const [selectedImage, setSelectedImage] = useState("");

  const setImage = (image) => {
    setSelectedImage(image);
  };

  const onSubmitHandler = async (values) => {
    setShowActivityIndicator(true);

    const { data } = await createNewItem({ storeId, ...values });

    if (data) {
      Toast.show({
        type: "success",
        text1: "Item Creation Successfully",
      });

      dispatch({
        type: "AddItem",
        payload: { itemId: data.item._id, storeId },
      });

      itemUpdationStatus(true);
      setShowActivityIndicator(false);
    } else {
      Toast.show({
        type: "error",
        text1: "Item Creation Failed",
      });

      itemUpdationStatus(false);
      setShowActivityIndicator(false);
    }
    changeVisibility(false);
  };

  const formikRef = useRef();

  useEffect(() => {
    if (formikRef.current) {
      formikRef.current.setFieldValue("store", storeId);
      formikRef.current.setFieldValue("gender", selectedGender);
      formikRef.current.setFieldValue("category", selectedCategory);
      formikRef.current.setFieldValue("size", selectedSize);
      formikRef.current.setFieldValue("subType", selectedType);
      formikRef.current.setFieldValue("mainType", selectedMainType);
      formikRef.current.setFieldValue("image", selectedImage);
    }
  }, [
    storeId,
    selectedGender,
    selectedSize,
    selectedType,
    selectedCategory,
    selectedMainType,
    selectedImage,
  ]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ItemSchema}
      onSubmit={(values) => {
        onSubmitHandler(values);
      }}
    >
      {(props) => {
        formikRef.current = props;

        return (
          <ScrollView>
            <ImageUpload chooseImage={setImage} />
            <Text style={globalStyles.errorText}>
              {props.touched["image"] && props.errors["image"]}
            </Text>

            <TextInput
              style={styles.textInput}
              placeholder="Item Name"
              onChangeText={props.handleChange("itemName")}
              value={props.values["itemName"]}
              onBlur={props.handleBlur("itemName")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched["itemName"] && props.errors["itemName"]}
            </Text>

            <TextInput
              style={styles.textInput}
              placeholder="Brand"
              onChangeText={props.handleChange("brandName")}
              value={props.values["brandName"]}
              onBlur={props.handleBlur("brandName")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched["brandName"] && props.errors["brandName"]}
            </Text>

            <DropDown
              data={genderSelectionOptions}
              searchBoolean={false}
              onSelectFunction={genderSelectionHandler}
              placeholder="Select Gender"
            />
            <Text style={globalStyles.errorText}>
              {props.touched["gender"] && props.errors["gender"]}
            </Text>

            <DropDown
              data={categorySelectionOption}
              searchBoolean={false}
              onSelectFunction={categorySelectionHandler}
              placeholder="Select Category"
            />
            <Text style={globalStyles.errorText}>
              {props.touched["category"] && props.errors["category"]}
            </Text>

            <DropDown
              data={mainTypeSelectionOption}
              searchBoolean={false}
              onSelectFunction={mainTypeSelectionHandler}
              placeholder="Select Main Type"
            />
            <Text style={globalStyles.errorText}>
              {props.touched["mainType"] && props.errors["mainType"]}
            </Text>

            <MultiSelectionDropDown
              data={typeSelectionOption}
              searchBoolean={true}
              label={"Selected Sub Types"}
              onSelectFunction={debouncedTypeSelectionHandler}
              placeholder="Select Sub Type"
            />

            <Text style={globalStyles.errorText}>
              {props.touched["subType"] && props.errors["subType"]}
            </Text>

            <DropDown
              data={sizeSelectionOption}
              searchBoolean={false}
              onSelectFunction={sizeSelectionHandler}
              placeholder="Select Size"
            />
            <Text style={globalStyles.errorText}>
              {props.touched["size"] && props.errors["size"]}
            </Text>

            <View style={{ marginTop: 20 }}>
              {!showActivityIndicator ? (
                <Button
                  title="Register"
                  color="dodgerblue"
                  onPress={props.handleSubmit}
                />
              ) : (
                <ActivityIndicator size="medium" color="dodgerblue" />
              )}
            </View>
          </ScrollView>
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
  },
});
