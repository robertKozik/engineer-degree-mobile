import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import routes from "../../constants/routes";
import ModulePage from "../ModulePage";
import ModuleList from "./ListItem";

const Stack = createStackNavigator();

const Home = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={routes.moduleList}
    >
      <Stack.Screen name={routes.moduleList} component={ModuleList} />
      <Stack.Screen name={routes.module} component={ModulePage} />
    </Stack.Navigator>
  );
};

export default Home;
