import { Formik } from "formik";
import {
  Button,
  View,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
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
import { colorVariants, fontFamily, fontWeight } from "../../global/string";
import { FocusableTextInput } from "./modals/focusableTextInput";

const ItemSchema = yup.object({
  brandName: yup.string().required("Brand Name is required"),
  subType: yup.array().min(1, "Sub Type is required"),
  mainType: yup.string().required("Main Type is required"),
  size: yup.string().required("Size is required"),
  itemName: yup.string().required("Item Name is required"),
  price: yup.number().required().moreThan(0, "Price is required"),
  gender: yup.string().required("Gender is required"),
  category: yup.string().required("Category is required"),
  image: yup.string().required("Image is required"),
  color: yup.string().required("Color is required"),
});

const initialValues = {
  store: "",
  brandName: "",
  itemName: "",
  price: 0,
  subType: [],
  mainType: "",
  image: "",
  size: "",
  gender: "",
  category: "teens",
  color: "",
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

  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  const [selectedGender, setSelectedGender] = useState("");
  const genderSelectionHandler = (gender) => {
    setSelectedGender(gender);
  };

  const { dispatch } = UseStoreContext();

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
          <>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Add Item</Text>

              <TouchableOpacity
                onPress={props.handleSubmit}
                style={{
                  backgroundColor: props.isValid
                    ? colorVariants.dodgerblue
                    : colorVariants.babyBlue,
                  height: 40,
                  width: 80,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {showActivityIndicator ? (
                  <ActivityIndicator
                    size="small"
                    color="white"
                    style={{
                      flex: 1,
                    }}
                  />
                ) : (
                  <Text
                    style={{
                      color: "white",
                      fontFamily: fontFamily.subTitleText,
                      fontWeight: fontWeight.bold,
                      fontSize: 15,
                    }}
                  >
                    Register
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <ScrollView
              style={{
                top: 25,
                marginBottom: 40,
              }}
            >
              <ImageUpload chooseImage={setImage} />
              <Text style={globalStyles.errorText}>
                {props.touched["image"] && props.errors["image"]}
              </Text>
              <FocusableTextInput
                field="itemName"
                form={props}
                placeholder="Item Name"
              />

              <Text style={globalStyles.errorText}>
                {props.touched["itemName"] && props.errors["itemName"]}
              </Text>

              <FocusableTextInput
                field="brandName"
                placeholder="Brand"
                form={props}
              />

              <Text style={globalStyles.errorText}>
                {props.touched["brandName"] && props.errors["brandName"]}
              </Text>

              <FocusableTextInput
                field="price"
                placeholder="Price"
                form={props}
                keyboardType={"numeric"}
              />

              <Text style={globalStyles.errorText}>
                {props.touched["price"] && props.errors["price"]}
              </Text>

              <FocusableTextInput
                field="color"
                placeholder="Item Color"
                form={props}
              />

              <Text style={globalStyles.errorText}>
                {props.touched["color"] && props.errors["color"]}
              </Text>

              <DropDown
                data={genderSelectionOptions}
                searchBoolean={false}
                onSelectFunction={genderSelectionHandler}
                placeholder="Select Gender"
                form={props}
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
              <Text style={globalStyles.errorText}>{props.errors["size"]}</Text>
            </ScrollView>
          </>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 100,
    backgroundColor: "white",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "dodgerblue",
    textAlign: "center",
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    borderRadius: 5,
    marginTop: 20,
  },
});
