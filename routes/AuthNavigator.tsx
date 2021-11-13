import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Dimensions } from "react-native";
import LanguagePicker from "../components/languagePicker";
import { Home, ModulePage, Notifications } from "../pages";
import routes from "../constants/routes";

const Drawer = createDrawerNavigator();

const AuthNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      headerShown: true,
    }}
    initialRouteName={routes.home}
    drawerContent={(props) => {
      return (
        <DrawerContentScrollView {...props}>
          <View
            style={{
              justifyContent: "space-between",
              height: Dimensions.get("window").height - 100,
            }}
          >
            <View>
              <DrawerItemList {...props} />
            </View>
            <View>
              <LanguagePicker {...props} />
            </View>
          </View>
        </DrawerContentScrollView>
      );
    }}
  >
    <Drawer.Screen name={routes.home} component={Home} />
    <Drawer.Screen name={routes.notifications} component={Notifications} />
  </Drawer.Navigator>
);

export default AuthNavigator;
