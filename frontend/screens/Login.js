import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const changeFocusColor = (e) => {
    e.nativeEvent.borderColor = "red";
  };
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/logo.png")} />
      <View
        style={[
          styles.inputView,
          isEmailFocused
            ? { borderColor: "dodgerblue" }
            : { borderColor: "black" },
        ]}
      >
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="grey"
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View
        style={[
          styles.inputView,
          isPasswordFocused
            ? { borderColor: "dodgerblue" }
            : { borderColor: "black" },
        ]}
      >
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="grey"
          secureTextEntry={true}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={styles.forgot_and_signup}>
          <TouchableOpacity>
            <Text style={{ paddingRight: 15 }}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ paddingLeft: 15 }}>SignUp?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
    width: "100%",
    height: "40%",
  },
  inputView: {
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 1,
    color: "black",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: "black",
  },
  forgot_and_signup: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "dodgerblue",
  },
  loginText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
