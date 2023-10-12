import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  colorVariants,
  fontFamily,
  fontSize,
  margin,
  padding,
} from "../../global/string";
import { useState } from "react";
import { UseUserContext } from "../../hooks/useUserContext";

export const UserProfile = () => {
  const { user } = UseUserContext();

  const currMeasurements = user.measurements;
  console.log(currMeasurements);

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
    <ScrollView style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingContainerText}>Measurements</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.record}>
          <View style={styles.recordKey}>
            <Text style={styles.recordKeyText}>Height (cm)</Text>
          </View>
          <View style={styles.recordValue}>
            <TextInput
              style={styles.recordValueText}
              defaultValue={currMeasurements?.height}
              placeholder="xx cm"
              onChangeText={(text) =>
                setMeasurements((prev) => ({ ...prev, height: text }))
              }
            />
          </View>
        </View>

        <View style={styles.record}>
          <View style={styles.recordKey}>
            <Text style={styles.recordKeyText}>Weight (kg)</Text>
          </View>
          <View style={styles.recordValue}>
            <TextInput
              style={styles.recordValueText}
              defaultValue={currMeasurements?.weight}
              placeholder="xx kg"
              onChangeText={(text) =>
                setMeasurements((prev) => ({ ...prev, weight: text }))
              }
            />
          </View>
        </View>

        <View style={styles.record}>
          <View style={styles.recordKey}>
            <Text style={styles.recordKeyText}>Waist Girth (in)</Text>
          </View>
          <View style={styles.recordValue}>
            <TextInput
              style={styles.recordValueText}
              defaultValue={currMeasurements.waistGirth}
              placeholder="xx kg"
              onChangeText={(text) =>
                setMeasurements((prev) => ({ ...prev, weight: text }))
              }
            />
          </View>
        </View>

        <View style={styles.record}>
          <View style={styles.recordKey}>
            <Text style={styles.recordKeyText}>Bust Girth (in)</Text>
          </View>
          <View style={styles.recordValue}>
            <TextInput
              style={styles.recordValueText}
              defaultValue={currMeasurements.bustGirth}
              placeholder="xx kg"
              onChangeText={(text) =>
                setMeasurements((prev) => ({ ...prev, weight: text }))
              }
            />
          </View>
        </View>

        {user.gender === "male" ? (
          <>
            <View style={styles.record}>
              <View style={styles.recordKey}>
                <Text style={styles.recordKeyText}>Neck Girth (in)</Text>
              </View>
              <View style={styles.recordValue}>
                <TextInput
                  style={styles.recordValueText}
                  defaultValue={currMeasurements.neckGirth}
                  placeholder="xx kg"
                  onChangeText={(text) =>
                    setMeasurements((prev) => ({ ...prev, weight: text }))
                  }
                />
              </View>
            </View>

            <View style={styles.record}>
              <View style={styles.recordKey}>
                <Text style={styles.recordKeyText}>Sleeve (in)</Text>
              </View>
              <View style={styles.recordValue}>
                <TextInput
                  style={styles.recordValueText}
                  defaultValue={currMeasurements.sleeve}
                  placeholder="xx kg"
                  onChangeText={(text) =>
                    setMeasurements((prev) => ({ ...prev, weight: text }))
                  }
                />
              </View>
            </View>
          </>
        ) : (
          <View style={styles.record}>
            <View style={styles.recordKey}>
              <Text style={styles.recordKeyText}>Hip Girth (in)</Text>
            </View>
            <View style={styles.recordValue}>
              <TextInput
                style={styles.recordValueText}
                defaultValue={currMeasurements.hipGirth}
                placeholder="xx kg"
                onChangeText={(text) =>
                  setMeasurements((prev) => ({ ...prev, weight: text }))
                }
              />
            </View>
          </View>
        )}

        <View style={styles.record}>
          <View style={styles.recordKey}>
            <Text style={styles.recordKeyText}>Inseam (in)</Text>
          </View>
          <View style={styles.recordValue}>
            <TextInput
              style={styles.recordValueText}
              defaultValue={currMeasurements.inseam}
              placeholder="xx kg"
              onChangeText={(text) =>
                setMeasurements((prev) => ({ ...prev, weight: text }))
              }
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.updateBtn}>
        <Text style={styles.updateBtnText}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: { padding: padding.medium, flexGrow: 1 },
  headingContainer: {},
  headingContainerText: {
    fontFamily: fontFamily.titleText,
    fontSize: fontSize.xLarge,
  },
  formContainer: {
    paddingTop: padding.medium,
  },
  record: {
    marginBottom: margin.xxSmall,
  },
  recordKey: {},
  recordKeyText: {
    fontFamily: fontFamily.normalText,
    fontSize: fontSize.medium,
    paddingBottom: padding.xxxSmall,
  },
  recordValue: {
    paddingBottom: padding.xxxSmall,
  },
  recordValueText: {
    fontFamily: fontFamily.normalText,
    fontSize: fontSize.medium,
    borderWidth: 1,
    padding: padding.xxxxSmall,
    borderRadius: 4,
  },
  updateBtn: {
    backgroundColor: colorVariants.turquesa,
    padding: padding.xSmall,
  },
  updateBtnText: {
    fontFamily: fontFamily.normalText,
    fontSize: fontSize.large,
    color: colorVariants.whiteSmoke,
    alignSelf: "center",
  },
});
