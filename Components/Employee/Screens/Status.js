import { Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/Ionicons";

export default function Status() {
  const status = useSelector((e) => e.statusInOut);
  const navigation = useNavigation();
  React.useEffect(() => {
    navigation.addListener("beforeRemove", (e) => e.preventDefault);
  });

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        margin: "10%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <FontAwesome5
        name="md-checkmark-circle"
        size={50}
        style={{
          marginTop: "3%",
          color: "green",
          alignSelf: "center",
        }}
      />
      <Text
        style={{
          alignSelf: "center",
          marginTop: 10,
          fontSize: 17,
          fontWeight: "bold",
        }}
      >
        {status !== "true"
          ? `Your ${status} data reported successfully`
          : "Employee data updated successfully"}
      </Text>
    </View>
  );
}
