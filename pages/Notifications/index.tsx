import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

interface props {
    navigation: any
}

export default function RegisterPage({ navigation }: props) {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
