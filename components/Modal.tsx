import React from "react";
import {
  Modal as ReactNativeModal,
  View,
  StyleSheet,
  Pressable,
  Text,
} from "react-native";
import { Button, Card, Overlay } from "react-native-elements";

const ModalCloseContext = React.createContext(() => {});

interface Props {
  animationType?: "slide" | "none" | "fade";
  onClose?: Function;
  onOpen?: Function;
  title?: string;
  trigger?: Element;
  triggerStyle?: any;
  type?: "button" | "link";
  children: React.ReactChild | Array<React.ReactChild>;
}

const Modal = ({
  animationType = "slide",
  onClose = () => null,
  onOpen = () => null,
  title = "",
  triggerStyle,
  type,
  children,
}: Props) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const onCloseAction = () => {
    onClose();
    setModalVisible(false);
  };

  const onOpenAction = () => {
    onOpen();
    setModalVisible(true);
  };

  const createTrigger = (): Element | React.ReactChild => {
    if (type === "button") {
      return (
        <Button style={triggerStyle} onPress={onOpenAction} title={title} />
      );
    }
    return <Text onPress={onOpenAction}>{title}</Text>;
  };

  return (
    <View>
      <ReactNativeModal
        animationType={animationType}
        transparent={true}
        visible={modalVisible}
        onRequestClose={onCloseAction}
      >
        <View style={styles.wrapper}>
          <Pressable style={styles.pressable} onPress={onCloseAction} />
          <Card containerStyle={styles.card}>
            <Card.Title h3>{title}</Card.Title>
            <Card.Divider />
            {/* MODAL BODY */}
            <ModalCloseContext.Provider value={() => setModalVisible(false)}>
              {children}
            </ModalCloseContext.Provider>
          </Card>
        </View>
      </ReactNativeModal>
      {/* TRIGGER */}
      {createTrigger()}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pressable: {
    width: "100%",
    height: "100%",
    zIndex: 0,
    position: "absolute",
  },
  card: { width: "90%" },
});

export default Modal;
export { ModalCloseContext };
