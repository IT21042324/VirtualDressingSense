import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../../components/userManagement/Button";

const Signup = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [gender, setGender] = useState("");
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

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    console.log("Signup details:", {
      email,
      phone,
      password,
      gender,
      measurements,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView>
        <View style={{ flex: 1, marginHorizontal: 22 }}>
          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginVertical: 12,
                color: COLORS.black,
              }}
            >
              Create Account
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: COLORS.black,
              }}
            >
              Connect with your friend today!
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Email address
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor={COLORS.black}
                keyboardType="email-address"
                style={{
                  width: "100%",
                }}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Mobile Number
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="+94"
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                style={{
                  width: "12%",
                  borderRightWidth: 1,
                  borderLeftColor: COLORS.grey,
                  height: "100%",
                }}
                value={phone}
                onChangeText={(text) => setPhone(text)}
              />

              <TextInput
                placeholder="Enter your phone number"
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                style={{
                  width: "80%",
                }}
                value={phone}
                onChangeText={(text) => setPhone(text)}
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Password
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={COLORS.black}
                secureTextEntry={isPasswordShown}
                style={{
                  width: "100%",
                }}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={{
                  position: "absolute",
                  right: 12,
                }}
              >
                {isPasswordShown ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.black} />
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.black} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Gender
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => setGender("male")}
                style={{
                  width: "48%",
                  height: 48,
                  borderColor: COLORS.black,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setGender("female")}
                style={{
                  width: "48%",
                  height: 48,
                  borderColor: COLORS.black,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>Female</Text>
              </TouchableOpacity>
            </View>
          </View>

          {gender && (
            <View style={{ marginBottom: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                }}
              >
                {`Enter ${gender === "male" ? "his" : "her"} measurements`}
              </Text>

              <TextInput
                placeholder="Height (cm)"
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                style={{
                  width: "100%",
                  height: 48,
                  borderColor: COLORS.black,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 22,
                  marginBottom: 12,
                }}
                value={measurements.height}
                onChangeText={(text) =>
                  setMeasurements((prev) => ({ ...prev, height: text }))
                }
              />

              <TextInput
                placeholder="Weight (kg)"
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                style={{
                  width: "100%",
                  height: 48,
                  borderColor: COLORS.black,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 22,
                  marginBottom: 12,
                }}
                value={measurements.weight}
                onChangeText={(text) =>
                  setMeasurements((prev) => ({ ...prev, weight: text }))
                }
              />

              {gender === "male" ? (
                <View>
                  <TextInput
                    placeholder="Bust Girth (in)"
                    placeholderTextColor={COLORS.black}
                    keyboardType="numeric"
                    style={styles.input}
                    value={measurements.bustGirth}
                    onChangeText={(text) =>
                      setMeasurements((prev) => ({ ...prev, bustGirth: text }))
                    }
                  />

                  <TextInput
                    placeholder="Neck Girth (in)"
                    placeholderTextColor={COLORS.black}
                    keyboardType="numeric"
                    style={styles.input}
                    value={measurements.neckGirth}
                    onChangeText={(text) =>
                      setMeasurements((prev) => ({ ...prev, neckGirth: text }))
                    }
                  />

                  <TextInput
                    placeholder="Sleeve (in)"
                    placeholderTextColor={COLORS.black}
                    keyboardType="numeric"
                    style={styles.input}
                    value={measurements.sleeve}
                    onChangeText={(text) =>
                      setMeasurements((prev) => ({ ...prev, sleeve: text }))
                    }
                  />

                  <TextInput
                    placeholder="Waist Girth (in)"
                    placeholderTextColor={COLORS.black}
                    keyboardType="numeric"
                    style={styles.input}
                    value={measurements.waistGirth}
                    onChangeText={(text) =>
                      setMeasurements((prev) => ({
                        ...prev,
                        waistGirth: text,
                      }))
                    }
                  />

                  <TextInput
                    placeholder="Inseam (in)"
                    placeholderTextColor={COLORS.black}
                    keyboardType="numeric"
                    style={styles.input}
                    value={measurements.inseam}
                    onChangeText={(text) =>
                      setMeasurements((prev) => ({ ...prev, inseam: text }))
                    }
                  />
                </View>
              ) : (
                <View>
                  <TextInput
                    placeholder="Bust Girth (in)"
                    placeholderTextColor={COLORS.black}
                    keyboardType="numeric"
                    style={styles.input}
                    value={measurements.bustGirth}
                    onChangeText={(text) =>
                      setMeasurements((prev) => ({ ...prev, bustGirth: text }))
                    }
                  />

                  <TextInput
                    placeholder="Waist Girth (in)"
                    placeholderTextColor={COLORS.black}
                    keyboardType="numeric"
                    style={styles.input}
                    value={measurements.waistGirth}
                    onChangeText={(text) =>
                      setMeasurements((prev) => ({
                        ...prev,
                        waistGirth: text,
                      }))
                    }
                  />

                  <TextInput
                    placeholder="Hip Girth (in)"
                    placeholderTextColor={COLORS.black}
                    keyboardType="numeric"
                    style={styles.input}
                    value={measurements.hipGirth}
                    onChangeText={(text) =>
                      setMeasurements((prev) => ({ ...prev, hipGirth: text }))
                    }
                  />

                  <TextInput
                    placeholder="Inseam (in)"
                    placeholderTextColor={COLORS.black}
                    keyboardType="numeric"
                    style={styles.input}
                    value={measurements.inseam}
                    onChangeText={(text) =>
                      setMeasurements((prev) => ({ ...prev, inseam: text }))
                    }
                  />
                </View>
              )}
            </View>
          )}

          <View
            style={{
              flexDirection: "row",
              marginVertical: 6,
            }}
          >
            <Checkbox
              style={{ marginRight: 8 }}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? COLORS.primary : undefined}
            />
            <Text>I agree to the terms and conditions</Text>
          </View>

          <Button
            title="Sign Up"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
            onPress={handleSignup}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 22,
            }}
          >
            <Text style={{ fontSize: 16, color: COLORS.black }}>
              Already have an account
            </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.primary,
                  fontWeight: "bold",
                  marginLeft: 6,
                }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  input: {
    width: "100%",
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 22,
    marginBottom: 12,
  },
};

export default Signup;
