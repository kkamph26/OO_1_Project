// Forsøgte at lave en kamare feture men forungere ikke, tror det fordi jeg ike installeret expo-cli korrekt, men det har jeg løst før, men det kom bare ikke med i denne afleveringen men det kommer ed til eksamen
// denne side er ikke connected til en database, det er bare for at illustrere hvordan en profilside kunne se ud, og det er vigitgt at have, da denne side 100% skal være en del af navigations stacken
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ProfileScreen() {
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params?.image) {
      setProfileImage(route.params.image);
    }
  }, [route.params?.image]);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: profileImage || "https://via.placeholder.com/150",
        }}
        style={styles.profileImage}
      />
      <Text style={styles.nameText}>John Doe</Text>
      <Text style={styles.memberStatus}>Member Status: Premium</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Camera")}
      >
        <Text style={styles.buttonText}>Take Profile Picture</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  memberStatus: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4caf50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
