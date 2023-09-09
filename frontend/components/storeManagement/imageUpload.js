import React, { useState } from "react";
import { Button, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

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
          <Button title="Pick an image from camera roll" onPress={pickImage} />
        </View>
      ) : (
        <View style={{ marginTop: 20, backgroundColor: "red" }}>
          <Button title="Remove Image" onPress={() => setImage(null)} />
        </View>
      )}
    </View>
  );
}
