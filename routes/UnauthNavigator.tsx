import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Login, Register } from "../pages";
import { Icon } from "react-native-elements";
import routes from "../constants/routes";

const Tab = createBottomTabNavigator();

const getIconByRoute = (route: string) => {
  switch (route) {
    case routes.login:
      return "user";
    case routes.register: //fallthrough;
    default:
      return "user-plus";
  }
};

const UnauthNavigator = () => (
  <Tab.Navigator
    initialRouteName="Login"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        return (
          <Icon
            tvParallaxProperties={{}} //for TypeScript happy living
            type="feather"
            raised={focused}
            name={getIconByRoute(route.name)}
            color={color}
            size={size - 10}
          />
        );
      },
      headerShown: false,
    })}
  >
    <Tab.Screen name={routes.login} component={Login} />
    <Tab.Screen name={routes.register} component={Register} />
  </Tab.Navigator>
);

export default UnauthNavigator;
