import React, { createContext } from "react";
import { BottomSheet } from "react-native-elements";
import { FAB } from "react-native-elements";

const CloseContext = createContext<any>(null);

const BottomShelf = ({ children }: any) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const triggerAction = () => setIsVisible(!isVisible);

  return (
    <>
      <FAB title="Create" onPress={triggerAction} />
      <BottomSheet
        isVisible={isVisible}
        containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
        modalProps={{
          style: {
            backgroundColor: "white",
            position: "absolute",
            top: 0,
            left: 0,
          },
        }}
      >
        <CloseContext.Provider value={triggerAction}>
          {children}
        </CloseContext.Provider>
      </BottomSheet>
    </>
  );
};

export { CloseContext };

export default BottomShelf;
