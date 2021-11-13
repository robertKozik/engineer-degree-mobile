import { connect } from "react-redux";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Card } from "react-native-elements";
import Form from "../../components/Form";
import { loginPayload } from "../../interfaces";
import { loginUser } from "../../redux/stateSlices/auth";
import { AppDispatch, RootState } from "../../redux/store";
import styles from "./style";

const Login = ({
  dispatchLogin,
  isLoginProcessing,
}: {
  dispatchLogin: Function;
  isLoginProcessing: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.outerWrapper}>
      <Card containerStyle={styles.card}>
        <Card.Title h2Style={styles.upperCase} h2>
          {t("login:title")}
        </Card.Title>
        <Card.Divider />
        <Form
          initialValues={{ email: "test", password: "test" }}
          onSubmit={(values) => dispatchLogin(values)}
          formName="login"
        >
          <Form.TextInput
            label={t("login:email")}
            placeholder={t("login:emailInputPlaceholder")}
            icon="mail"
            name="email"
          />
          <Form.TextInput
            label={t("login:password")}
            placeholder={t("login:passwordInputPlaceholder")}
            icon="lock"
            name="password"
          />
          <Form.Submit loading={isLoginProcessing} />
        </Form>
      </Card>
    </View>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  dispatchLogin: (payload: loginPayload) => dispatch(loginUser(payload)),
});

const mapStateToProps = (state: RootState) => ({
  isLoginProcessing: state.auth.isLoginProcessing,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
