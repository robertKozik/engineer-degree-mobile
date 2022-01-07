import React from "react";
import { Text, View } from "react-native";
import { FAB } from "react-native-elements";
import styles from "./style";

interface props {
  navigation: any;
}

export default function RegisterPage({ navigation }: props) {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <FAB
        style={styles.fab}
        onPress={() => navigation.goBack()}
        placement="right"
        title="back"
      />
    </View>
  );
}
