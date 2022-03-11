import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import FormData from "form-data";

export default function Face() {
  const [camera, setCamera] = React.useState(null);
  const [detectCount, setDetectCount] = React.useState(0);
  const [isProcessing, setIsProcessing] = React.useState(true);
  const [status, setStatus] = React.useState(
    "Allow  AttendEase to access your camera"
  );
  const navigation = useNavigation();
  const status_1 = useSelector((e) => e.statusInOut);
  const API_URL = useSelector((e) => e.appApiUrl);

  const uploadImage = (pictureuri) => {
    setStatus("Connecting to server");
    let url = `${API_URL}/face_match`;
    var data = new FormData();
    data.append("file1", {
      uri: pictureuri,
      name: status_1,
      type: "image/jpg",
    });

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
      body: data,
    })
      .then((response) =>
        response.json().then((data) => {
          console.log("Recieved Response");
          setStatus("Recieved Response");
          if (data.status) navigation.navigate("Status");
          else setIsProcessing(false);
        })
      )
      .catch((err) => {
        setStatus("Something went wrong");
        console.log(err);
        setIsProcessing(false);
      });
  };

  const takePicture = async () => {
    if (camera) {
      await camera
        .takePictureAsync({
          quality: 0.1,
          exif: true,
        })
        .then((data) => {
          uploadImage(data.uri);
          setIsProcessing(true);
        });
    }
  };

  const handleFacesDetected = ({ faces }) => {
    if (faces.length) {
      setStatus("Detected face");
      setDetectCount(detectCount + 1);
      if (detectCount == 3) {
        setDetectCount(0);
        takePicture();
      }
    } else {
      setStatus("Face not detected");
    }
  };

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setIsProcessing(!(status === "granted"));
    })();
  }, []);

  return (
    <View style={styles.nav}>
      {isProcessing ? (
        <></>
      ) : (
        <Camera
          style={styles.camera}
          ref={(ref) => setCamera(ref)}
          type={Camera.Constants.Type.back}
          onFacesDetected={handleFacesDetected}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.fast,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
            runClassifications: FaceDetector.FaceDetectorClassifications.none,
            minDetectionInterval: 500,
            tracking: true,
          }}
        />
      )}
      <View style={styles.status}>
        <ActivityIndicator size="large" color="green" />
        <Text style={styles.text}>{status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    paddingTop: 50,
    paddingLeft: 25,
    paddingRight: 25,
    height: "100%",
    flex: 1,
    flexDirection: "column",
  },
  camera: {
    height: 400,
    width: 325,
    marginTop: 20,
    alignSelf: "center",
  },
  status: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 20,
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
