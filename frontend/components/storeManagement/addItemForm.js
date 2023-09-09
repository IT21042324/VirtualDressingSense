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
import axios from "axios";
import Toast from "react-native-toast-message";
import { ImageUpload } from "./imageUpload";
import { UseStoreContext } from "../../hooks/useStoreContext";

const ItemSchema = yup.object({
  brandName: yup.string().required(),
  subType: yup.array().required(),
  mainType: yup.string().required(),
  size: yup.string().required(),
  itemName: yup.string().required(),
  gender: yup.string().required(),
  category: yup.string().required(),
  measurementType: yup.string().required(),
  armLength: yup.number().required(),
  backWidth: yup.number().required(),
  neckCircumference: yup.number().required(),
  chestHeight: yup.number().required(),
  bustHeight: yup.number().required(),
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
  measurementType: "in",
  category: "teens",
  chestHeight: 0,
  bodyShape: "",
  armLength: 0,
  backWidth: 0,
  neckCircumference: 0,
  bustHeight: 0,
  bodyShape: "endomorph",
};

export const AddItemForm = ({ changeVisibility, storeId }) => {
  const {
    sizeSelectionOption,
    genderSelectionOptions,
    typeSelectionOption,
    mainTypeSelectionOption,
    measurementTypeSelectionOption,
    categorySelectionOption,
  } = GlobalConstants;

  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  const [selectedGender, setSelectedGender] = useState("male");
  const genderSelectionHandler = (gender) => {
    setSelectedGender(gender);
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const categorySelectionHandler = (category) => {
    setSelectedCategory(category);
  };

  categorySelectionHandler;

  const [selectedSize, setSelectedSize] = useState("");
  const sizeSelectionHandler = (size) => {
    setSelectedSize(size);
  };

  const [selectedMeasurementType, setSelectedMeasurementType] = useState("in");
  const measurementTypeSelectionHandler = (type) => {
    setSelectedMeasurementType(type);
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

  const { stores, dispatch } = UseStoreContext();

  const onSubmitHandler = async (values) => {
    setShowActivityIndicator(true);

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Zjc0M2UwNDAzNzQxZDQzNmMxZTZiZSIsImlhdCI6MTY5MzkyNjM2OCwiZXhwIjoxNjk0MTg1NTY4fQ.S5gfmagFa3zWtUlTyMbTpxEum8JfMLg8ufEJC0rRroU";
    const measurements = [
      {
        backWidth: values.backWidth,
        bustHeight: values.bustHeight,
        chestHeight: values.chestHeight,
        neckCircumference: values.neckCircumference,
        bodyShape: values.bodyShape,
      },
    ];

    const newItem = {
      brandName: values.brandName,
      category: values.category,
      gender: values.gender,
      image: values.image,
      itemName: values.itemName,
      mainType: values.mainType,
      measurements: measurements,
      measurementType: values.measurementType,
      size: values.size,
      subType: values.subType,
      image: values.image,
    };

    try {
      const REACT_APP_BACKEND_URL = "https://virtualdressingsense.onrender.com";

      const { data } = await axios.patch(
        `${REACT_APP_BACKEND_URL}/api/stores/add/item/${storeId}`,
        newItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Toast.show({
        type: "success",
        text1: "Item Creation Successfully",
      });

      dispatch({
        type: "AddItem",
        payload: { item: data.items.slice(-1), storeId },
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Item Creation Failed",
        text2: err.message,
      });
      console.log(err);
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
      formikRef.current.setFieldValue(
        "measurementType",
        selectedMeasurementType
      );
    }
  }, [
    storeId,
    selectedGender,
    selectedSize,
    selectedType,
    selectedCategory,
    selectedMainType,
    selectedMeasurementType,
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
              {props.touched["gender"] && props.errors["gender"]}
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
              onSelectFunction={typeSelectionHandler}
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

            <DropDown
              data={measurementTypeSelectionOption}
              searchBoolean={false}
              onSelectFunction={measurementTypeSelectionHandler}
              placeholder="Measurement Type"
            />
            <Text style={globalStyles.errorText}>
              {props.touched["measurementType"] &&
                props.errors["measurementType"]}
            </Text>

            <TextInput
              style={styles.textInput}
              placeholder="Arm Length"
              onChangeText={props.handleChange("armLength")}
              value={props.values["armLength"]}
              onBlur={props.handleBlur("armLength")}
              keyboardType="numeric"
            />
            <Text style={globalStyles.errorText}>
              {props.touched["armLength"] && props.errors["armLength"]}
            </Text>

            <TextInput
              style={styles.textInput}
              placeholder="Back Width"
              onChangeText={props.handleChange("backWidth")}
              value={props.values["backWidth"]}
              onBlur={props.handleBlur("backWidth")}
              keyboardType="numeric"
            />
            <Text style={globalStyles.errorText}>
              {props.touched["backWidth"] && props.errors["backWidth"]}
            </Text>

            <TextInput
              style={styles.textInput}
              placeholder="Neck Circumference"
              onChangeText={props.handleChange("neckCircumference")}
              value={props.values["neckCircumference"]}
              onBlur={props.handleBlur("neckCircumference")}
              keyboardType="numeric"
            />
            <Text style={globalStyles.errorText}>
              {props.touched["neckCircumference"] &&
                props.errors["neckCircumference"]}
            </Text>

            {selectedGender.toLocaleLowerCase() !== "male" ? (
              <>
                <TextInput
                  style={styles.textInput}
                  placeholder="Bust Height"
                  onChangeText={props.handleChange("bustHeight")}
                  value={props.values["bustHeight"]}
                  onBlur={props.handleBlur("bustHeight")}
                  keyboardType="numeric"
                />
                <Text style={globalStyles.errorText}>
                  {props.touched["bustHeight"] && props.errors["bustHeight"]}
                </Text>
              </>
            ) : (
              <>
                <TextInput
                  style={styles.textInput}
                  placeholder="Chest Height"
                  onChangeText={props.handleChange("chestHeight")}
                  value={props.values["chestHeight"]}
                  onBlur={props.handleBlur("chestHeight")}
                  keyboardType="numeric"
                />
                <Text style={globalStyles.errorText}>
                  {props.touched["chestHeight"] && props.errors["chestHeight"]}
                </Text>
              </>
            )}

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
