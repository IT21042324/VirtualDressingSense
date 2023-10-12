import { View, StyleSheet, Text } from "react-native";

export const UserProfile = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <Text>Measurements</Text>
      </View>

      <View style={styles.formContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({});
