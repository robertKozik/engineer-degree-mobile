import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Button, Card, Input } from "react-native-elements";
import Form from "../../components/Form";
import styles from "./style";

const Login = () => {
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
          onSubmit={(values) => console.log(values)}
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
          <Form.Submit />
        </Form>
      </Card>
    </View>
  );
};

export default Login;
