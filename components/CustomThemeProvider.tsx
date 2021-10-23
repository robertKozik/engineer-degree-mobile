import React from "react";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "react-native-elements";
import colorModes from "../constants/colorModes";
import basicTheme from "../styles/basicTheme";

interface props {
  children: React.ReactChild | Array<React.ReactChild>;
}

const CustomThemeProvider = ({ children }: props) => {
  const systemColor = useColorScheme();
  const isDark = systemColor === colorModes.dark;

  return (
    <ThemeProvider theme={basicTheme} useDark={isDark}>
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
