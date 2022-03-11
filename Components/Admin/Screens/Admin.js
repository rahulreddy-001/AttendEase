import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { Component } from "react";
import { Camera } from "expo-camera";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as FaceDetector from "expo-face-detector";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

function Admin() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPerminnsion(status === "granted");
    })();
  });
  const [text, setText] = React.useState("");
  const [hasPermisstion, setHasPerminnsion] = React.useState();
  const [camera, setCamera] = React.useState(null);
  const API_URL = useSelector((e) => e.appApiUrl);
  const [isProcessing, setIsProcessing] = React.useState(true);
  const uploadImage = (pictureuri) => {
    setIsProcessing(false);
    let apiUrl = `${API_URL}/add_face`;

    var data = new FormData();
    data.append("file1", {
      uri: pictureuri,
      name: `${text}.jpg`,
      type: "image/jpg",
    });

    fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
      body: data,
    })
      .then((response) => {
        console.log("Response Recieved");
        response.json().then((data) => {
          console.log(data);
          if (data.status) {
            dispatch({ type: "updateStatus", data: "true" });
            navigation.navigate("Status");
          } else {
            setIsProcessing(true);
          }
        });
      })
      .catch((err) => {
        setIsProcessing(true);
        console.log("err ");
        console.log(err);
      });
  };

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync({
        quality: 0.1,
        exif: false,
      });
      console.log("Verifing through server");
      await uploadImage(data.uri);
    }
  };
  return (
    <View style={{ margin: 40, height: "100%" }}>
      {isProcessing ? (
        <>
          <TextInput
            style={{
              height: 40,
              backgroundColor: "#FFF",
              paddingVertical: 3,
              paddingHorizontal: 10,
              marginHorizontal: 2,
              borderRadius: 5,
              borderColor: "black",
              borderWidth: 2,
              fontSize: 15,
              underlineColorAndroid: "black",
            }}
            placeholder="Employee Id"
            onChangeText={(newText) => setText(newText)}
            defaultValue={text}
          />
          <Camera
            style={styles.camera}
            ref={(ref) => setCamera(ref)}
            type={Camera.Constants.Type.back}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
              runClassifications: FaceDetector.FaceDetectorClassifications.none,
              minDetectionInterval: 500,
              tracking: true,
            }}
          />
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <MaterialCommunityIcons
              name={"camera-iris"}
              size={60}
              color={"black"}
            />
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.status}>
          <ActivityIndicator size="large" color="green" />
          <Text style={styles.text}>{"Entering information"}</Text>
        </View>
      )}
    </View>
  );
}

export default Admin;

const styles = StyleSheet.create({
  camera: {
    height: 400,
    width: 325,
    marginTop: 20,
    alignSelf: "center",
  },
  button: {
    borderRadius: 500,
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: 30,
  },
  status: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 50,
    marginBottom: "30%",
    width: "100%",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "center",
    paddingLeft: 20,
  },
});
