import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Marker, Circle } from "react-native-maps";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Map() {
  const [status, setStatus] = React.useState(
    "Allow  AttendEase to access your location"
  );
  const [distance, setDistance] = useState(500);
  const navigation = useNavigation();
  const officeLocation = {
    // latitude: 17.45567538778599,
    // longitude: 78.66650722606833,
    // latitudeDelta: 0.0043,
    // longitudeDelta: 0.0034,
    latitude: 17.4364769,
    longitude: 78.6042278,
    latitudeDelta: 0.0043,
    longitudeDelta: 0.0034,
  };

  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }

    var R = 6371000;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  React.useEffect(() => {
    Location.requestForegroundPermissionsAsync().then((res) => {
      if (res.granted) {
        Location.getCurrentPositionAsync({}).then((location) => {
          let userLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0034,
          };

          setUserLocation(userLocation);

          const distance = getDistanceFromLatLonInKm(
            userLocation.latitude,
            userLocation.longitude,
            officeLocation.latitude,
            officeLocation.longitude
          );

          if (distance !== null && distance < 400) {
            setStatus("You are in office premises");
            setTimeout(() => {
              distance < 400 && distance !== "null"
                ? navigation.navigate("Scan")
                : null;
            }, 3000);
          } else {
            setStatus("You are not in office premises");
          }
        });
      } else {
        setStatus("Permission to access location was denied");
      }
    });
  });

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={userLocation}>
        <Marker
          coordinate={{
            latitude: officeLocation.latitude,
            longitude: officeLocation.longitude,
          }}
        ></Marker>
        <Marker
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
        >
          <MaterialIcons
            name="person-pin-circle"
            size={40}
            style={{
              color: "blue",
              fontWeight: "bold",
              alignSelf: "center",
            }}
          />
        </Marker>
        <Circle
          center={{
            latitude: officeLocation.latitude,
            longitude: officeLocation.longitude,
          }}
          radius={350}
          strokeColor={"lightblue"}
          fillColor={"rgba(22, 255, 255, 0.10)"}
        />
      </MapView>

      <View style={styles.status}>
        <ActivityIndicator size="large" color="green" />
        <Text style={styles.text}>{status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 200,
  },
  locText: {
    fontSize: 20,
    padding: 10,
    fontWeight: "500",
    color: "white",
    width: "100%",
    marginTop: "1%",
    paddingLeft: "10%",
  },
  status: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 20,
    marginBottom: "1%",
    width: "90%",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    paddingLeft: 20,
  },
});
