//kamera appen fungere ikke 100% optimalt, endnu men dette burde være rigtigt.

import { Camera, CameraType } from "expo-camera/legacy";
import { useState, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function CameraScreen({ navigation }) {
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef();

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync();
      navigation.navigate("Profile", { image: result.uri });
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <TouchableOpacity
          style={styles.flipButton}
          onPress={() =>
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back
            )
          }
        >
          <Ionicons name="camera-reverse-outline" size={32} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <Text style={styles.text}>Capture</Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  flipButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  captureButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: "#000",
  },
});
