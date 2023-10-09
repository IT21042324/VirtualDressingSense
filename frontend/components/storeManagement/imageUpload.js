import React, { useState } from "react";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { colorVariants } from "../../global/string";

export function ImageUpload({ chooseImage }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // convert image to base 64 url
      let base64Url = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: "base64",
      });
      chooseImage(base64Url);
    }
  };

  return (
    <View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>

      {!image ? (
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            onPress={pickImage}
            style={{
              backgroundColor: colorVariants.babyBlue,
              padding: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "ubuntu-regular",
                fontSize: 18,
                color: colorVariants.white,
                fontWeight: "bold",
              }}
            >
              Pick An Image From Camera Roll
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            onPress={() => setImage(null)}
            style={{
              backgroundColor: colorVariants.crimson,
              padding: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "ubuntu-regular",
                fontSize: 18,
                color: colorVariants.white,
                fontWeight: "bold",
              }}
            >
              Remove Image
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
