import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
} from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";

export default function BookingScreen() {
  const [sports, setSports] = useState(["Football", "GYM", "Tennis"]);
  const [trainers, setTrainers] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);

  // Henter trænere for den valgte sport fra databasen
  const fetchTrainers = (sport) => {
    const db = getDatabase();
    const trainersRef = ref(db, `Trainers/${sport}`);
    onValue(trainersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const trainersArray = Object.values(data);
        setTrainers(trainersArray);
      } else {
        setTrainers([]);
      }
    });
  };
  // Håndterer sport-valg og opdaterer liste af trænere
  const handleSportSelect = (sport) => {
    setSelectedSport(sport);
    fetchTrainers(sport);
  };
  // Viser en liste af sportsgrene eller trænere afhængigt af valg
  return (
    <View style={styles.container}>
      {selectedSport && (
        <Button title="Tilbage" onPress={() => setSelectedSport(null)} />
      )}
      {!selectedSport ? (
        <View>
          <Text style={styles.title}>Select a Sport</Text>
          {sports.map((sport) => (
            <TouchableOpacity
              key={sport}
              style={styles.sportButton}
              onPress={() => handleSportSelect(sport)}
            >
              <Text style={styles.sportButtonText}>{sport}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View>
          <Text style={styles.title}>
            Available Trainers for {selectedSport}
          </Text>
          <FlatList
            data={trainers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.trainerCard}>
                <Text style={styles.trainerName}>{item.name}</Text>
                <Text style={styles.trainerInfo}>{item.info}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  sportButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    margin: 5,
  },
  sportButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  trainerCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  trainerName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  trainerInfo: {
    fontSize: 14,
    color: "#555",
  },
});
