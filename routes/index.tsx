import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import UnauthNavigator from "./UnauthNavigator";
import AuthNavigator from "./AuthNavigator";

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  return (
    <NavigationContainer>
      {isLoggedIn ? <AuthNavigator /> : <UnauthNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
