import { DrawerItem } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/routers";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-native-elements";
import Modal, { ModalCloseContext } from "./Modal";

const LanguagePicker = ({ navigation }: { navigation: any }) => {
  const { i18n } = useTranslation(); // i18n instance

  // array with all supported languages
  const languages = [
    { name: "en", label: "English" },
    { name: "de", label: "German" },
  ];

  const LanguageItem = ({ name, label }: { name: string; label: string }) => {
    const close = React.useContext(ModalCloseContext);
    return (
      <Button
        onPress={() => {
          i18n.changeLanguage(name); //changes the app language
          close();
        }}
        type="clear"
        title={label}
      />
    );
  };

  return (
    <Modal
      animationType="slide"
      type="button"
      triggerStyle={triggerStyle}
      onOpen={() => navigation.dispatch(DrawerActions.closeDrawer())}
      title="Langauge"
    >
      {languages.map((lang) => (
        <LanguageItem {...lang} key={lang.name} />
      ))}
    </Modal>
  );
};
const triggerStyle = {
  width: "94%",
  marginHorizontal: "3%",
};

export default LanguagePicker;
