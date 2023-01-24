import { View, Modal, TouchableWithoutFeedback, Pressable } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import React from "react";

export default function PopupModel({
  setmodalvisible,
  animationType,
  modalvisible,
  bg_opacity,
  onclosefn,
  children,
}) {
  function close() {
    setmodalvisible(false);
    onclosefn ? onclosefn() : null;
  }
  return (
    <View className="flex-1 justify-center ">
      <GestureRecognizer onSwipeDown={close}>
        <Modal
          animationType={animationType}
          transparent={true}
          visible={modalvisible}
          presentationStyle="overFullScreen"
          onRequestClose={() => {
            setmodalvisible(!modalvisible);
            console.log("Gfg");
          }}
        >
          <View className="relative  flex justify-center w-screen h-screen ">
            <Pressable
              className={`absolute blur-lg h-screen w-screen  bg-gray-700 opca ${
                bg_opacity ? "opacity-"+bg_opacity : "opacity-20"
              }`}
              onPress={close}
            ></Pressable>
            {children}
          </View>
        </Modal>
      </GestureRecognizer>
    </View>
  );
}
