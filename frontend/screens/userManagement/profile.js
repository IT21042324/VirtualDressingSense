import { View, StyleSheet, Text, TextInput } from "react-native";
import { padding } from "../../global/string";
import { useState } from "react";
import { UseUserContext } from "../../hooks/useUserContext";

export const UserProfile = () => {
  const { user } = UseUserContext();

  const currMeasurements = user.measurements;
  console.log(user);

  const [measurements, setMeasurements] = useState({
    height: "",
    weight: "",
    bustGirth: "",
    neckGirth: "",
    sleeve: "",
    waistGirth: "",
    hipGirth: "",
    inseam: "",
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <Text>Measurements</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.record}>
          <View style={styles.recordKey}>
            <Text style={styles.recordKeyText}>Height</Text>
          </View>
          <View style={styles.recordValue}>
            <TextInput
              style={styles.recordValueText}
              defaultValue={currMeasurements.height}
              placeholder="xx cm"
              onChangeText={(text) =>
                setMeasurements((prev) => ({ ...prev, height: text }))
              }
            />
          </View>
        </View>

        <View style={styles.record}>
          <View style={styles.recordKey}>
            <Text style={styles.recordKeyText}>Weight</Text>
          </View>
          <View style={styles.recordValue}>
            <TextInput
              style={styles.recordValueText}
              defaultValue={currMeasurements.weight}
              placeholder="xx kg"
              onChangeText={(text) =>
                setMeasurements((prev) => ({ ...prev, weight: text }))
              }
            />
          </View>
        </View>

        {user.gender === "male" ? (
          <View style={styles.record}>
            <View style={styles.recordKey}>
              <Text style={styles.recordKeyText}>Weight</Text>
            </View>
            <View style={styles.recordValue}>
              <TextInput
                style={styles.recordValueText}
                defaultValue={currMeasurements.weight}
                placeholder="xx kg"
                onChangeText={(text) =>
                  setMeasurements((prev) => ({ ...prev, weight: text }))
                }
              />
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { padding: padding.medium },
  headingContainer: {},
  formContainer: {},
});
