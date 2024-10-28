import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location"; // Importér placeringstjenester

export default function LocationScreen() {
  const [markers, setMarkers] = useState([]);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 56.26392,
    longitude: 9.501785,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [loading, setLoading] = useState(true);

  // Funktion til at hente markører fra AsyncStorage
  const getMarkers = async () => {
    try {
      const storedMarkers = await AsyncStorage.getItem("markers");
      const parsedMarkers = storedMarkers ? JSON.parse(storedMarkers) : [];
      setMarkers(parsedMarkers);
      if (parsedMarkers.length > 0) {
        const latestMarker = parsedMarkers[parsedMarkers.length - 1];
        setInitialRegion({
          latitude: latestMarker.latitude,
          longitude: latestMarker.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    } catch (error) {
      console.error("Error retrieving markers", error);
    } finally {
      setLoading(false);
    }
  };

  // Funktion til at tilføje markør på nuværende placering
  const addMarker = async () => {
    // Anmoder om tilladelse til at bruge placeringstjenester
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Location access is required to add markers."
      );
      return;
    }

    // Henter nuværende placering
    let location = await Location.getCurrentPositionAsync({});
    const newMarker = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    // Opdaterer markørlisten og gemmer den i AsyncStorage
    const updatedMarkers = [...markers, newMarker];
    setMarkers(updatedMarkers);
    try {
      await AsyncStorage.setItem("markers", JSON.stringify(updatedMarkers));
      alert("Marker added at your current location!");
    } catch (error) {
      console.error("Error saving marker", error);
    }
  };

  // Henter markører, når skærmen åbnes
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getMarkers();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            pinColor="#FF0000"
          />
        ))}
      </MapView>
      {/* Knap til at tilføje en markør på nuværende placering */}
      <TouchableOpacity style={styles.markerButton} onPress={addMarker}>
        <Text style={styles.markerButtonText}>Add Marker</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  markerButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  markerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
