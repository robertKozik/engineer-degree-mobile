import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import routes from "../../constants/routes";
import { Charts, Config, Overview } from "./subpages";
import { Icon } from "react-native-elements";

const Tab = createBottomTabNavigator();

const getIconByRoute = (route: string) => {
  switch (route) {
    case routes.moduleOverview:
      return "command";
    case routes.moduleConfig:
      return "sliders";
    case routes.moduleCharts: //fallthrough;
    default:
      return "pie-chart";
  }
};

const ModulePage = ({ route }: { route: any }) => {
  const { id } = route.params;
  return (
    <Tab.Navigator
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
      initialRouteName={routes.moduleOverview}
    >
      <Tab.Screen
        name={routes.moduleOverview}
        initialParams={{ id }}
        component={Overview}
      />
      <Tab.Screen
        name={routes.moduleCharts}
        initialParams={{ id }}
        component={Charts}
      />
      <Tab.Screen
        name={routes.moduleConfig}
        initialParams={{ id }}
        component={Config}
      />
    </Tab.Navigator>
  );
};

export default ModulePage;
