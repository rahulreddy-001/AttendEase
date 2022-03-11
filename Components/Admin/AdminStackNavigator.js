import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, Text, View } from "react-native";
import Admin from "./Screens/Admin";
import Status from "./Screens/Status";
import Avatar from "../Assets/icon.png";

function LogoTitle() {
  return (
    <View
      style={{
        minHeight: 60,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image style={{ width: 40, height: 40 }} source={Avatar} />
      <Text style={{ fontSize: 22, fontWeight: "800", paddingLeft: 20 }}>
        AttendEase (Admin)
      </Text>
    </View>
  );
}

const AdminStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Admin"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Group>
        <Stack.Screen
          name="Admin"
          component={Admin}
          options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
        />
        <Stack.Screen name="Status" component={Status} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AdminStackNavigator;
