import "react-native-gesture-handler";
import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomThemeProvider from "./components/CustomThemeProvider";
import "./i18n.config";
import Navigation from "./routes";
import { AppRegistry } from "react-native";

const App = () => {
  return (
    <SafeAreaProvider>
      <CustomThemeProvider>
        <Navigation />
      </CustomThemeProvider>
    </SafeAreaProvider>
  );
};

AppRegistry.registerComponent("main", () => App);

export default App;
