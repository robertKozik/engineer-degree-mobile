import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import UnauthNavigator from "./UnauthNavigator";
import AuthNavigator from "./AuthNavigator";
import { connect } from "react-redux";
import { RootState } from "../redux/store";

const Navigation = ({ token }: any) => (
  <NavigationContainer>
    {token ? <AuthNavigator /> : <UnauthNavigator />}
  </NavigationContainer>
);

const mapStateToProps = (state: RootState) => {
  return { token: state.auth.token };
};

export default connect(mapStateToProps)(Navigation);
