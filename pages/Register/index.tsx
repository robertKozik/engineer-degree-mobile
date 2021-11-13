import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Button, Card, Input } from "react-native-elements";
import styles from "./style";

const Register = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.outerWrapper}>
      <Card containerStyle={styles.card}>
        <Card.Title h2Style={styles.upperCase} h2>
          {t("register:title")}
        </Card.Title>
        <Card.Divider />
        <Input
          label={t("login:email")}
          placeholder={t("login:emailInputPlaceholder")}
          leftIcon={{ name: "mail" }}
        />
        <Input
          label={t("login:password")}
          placeholder={t("login:passwordInputPlaceholder")}
          leftIcon={{ name: "lock" }}
        />
        <Input
          label={t("register:repassword")}
          placeholder={t("login:passwordInputPlaceholder")}
          leftIcon={{ name: "lock" }}
        />
        <Button titleStyle={styles.upperCase} title={t("register:submit")} />
      </Card>
    </View>
  );
};

export default Register;
