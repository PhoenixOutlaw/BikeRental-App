import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { View, StyleSheet, Text } from "react-native";

export default function CustomDrawerContent(props) {
    return (
      <View style={styles.container}>
      <DrawerContentScrollView style={styles.container} {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Help"
          onPress={() => console.log("object")}
          />

          <View style={styles.container}><Text>test</Text></View>
      </DrawerContentScrollView>

      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    position:"absolute",
    flex: 1,
    height: "100%",
    width: "300%",
    zIndex:800,
   flexGrow: 1
  }
})