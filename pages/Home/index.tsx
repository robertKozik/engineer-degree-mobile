import React from "react";
import { StyleSheet, View } from "react-native";
import { List } from "../../components";
import { createStackNavigator } from "@react-navigation/stack";
import routes from "../../constants/routes";
import ModulePage from "../ModulePage";
import renderItem from "./ListItem";

const Stack = createStackNavigator();

const data: Array<any> = [
  {
    photo_url: "https://i.iplsc.com/-/000ADUDRA5UTMOJM-C122.jpg",
    title: "Item1",
    subtitle: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
  },
  {
    photo_url: "https://i.iplsc.com/-/000ADUDRA5UTMOJM-C122.jpg",
    title: "Item2",
    subtitle: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
  },
  {
    photo_url: "https://i.iplsc.com/-/000ADUDRA5UTMOJM-C122.jpg",
    title: "Item3",
    subtitle: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
  },
  {
    photo_url: "https://i.iplsc.com/-/000ADUDRA5UTMOJM-C122.jpg",
    title: "Item4",
    subtitle: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
  },
  {
    photo_url: "https://i.iplsc.com/-/000ADUDRA5UTMOJM-C122.jpg",
    title: "Item5",
    subtitle: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
  },
];

const ModuleList = () => {
  return (
    <View style={styles.container}>
      <List data={data} renderItemFunc={renderItem} />
    </View>
  );
};

const Home = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName={routes.moduleList}
  >
    <Stack.Screen name={routes.moduleList} component={ModuleList} />
    <Stack.Screen name={routes.module} component={ModulePage} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
