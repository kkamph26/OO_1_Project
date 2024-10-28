import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getDatabase, ref, push, onValue } from "firebase/database";

export default function HomeScreen() {
  const [rating, setRating] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  const handleRating = (stars) => {
    setRating(stars);
    const db = getDatabase();
    const ratingsRef = ref(db, "Ratings/");
    push(ratingsRef, { rating: stars });
  };

  useEffect(() => {
    const db = getDatabase();
    const ratingsRef = ref(db, "Ratings/");

    onValue(ratingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const ratingsArray = Object.values(data);
        setTotalRatings(ratingsArray.length);

        const sumRatings = ratingsArray.reduce(
          (acc, curr) => acc + curr.rating,
          0
        );
        const avgRating =
          ratingsArray.length > 0 ? sumRatings / ratingsArray.length : 0;
        setAverageRating(avgRating.toFixed(1));
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate this profile:</Text>
      <View style={styles.ratingButtonsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            style={styles.ratingButton}
            onPress={() => handleRating(star)}
          >
            <Text style={styles.ratingButtonText}>{`${star} Stars`}</Text>
          </TouchableOpacity>
        ))}
        {/* herfra og ned til linje 69 er udviklet ved hjælp ad Bing CoPilot d. 24/10-2024, vær opmærksom på den tager gennemsnitet af alle ratings i hele databasen og ikke kun fra en profil som er tiltænkt, men det bliver også kort berøt i readme filen*/}
      </View>
      {rating && (
        <Text style={styles.resultText}>
          You rated this profile: {rating} stars
        </Text>
      )}

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Average Rating</Text>
        <Text style={styles.summaryText}>Total Ratings: {totalRatings}</Text>
        <Text style={styles.summaryText}>
          Average Rating: {averageRating} stars
        </Text>
      </View>
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
  ratingButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    width: "100%",
    flexWrap: "wrap",
  },
  ratingButton: {
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    margin: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: "30%",
    alignItems: "center",
  },
  ratingButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  resultText: {
    marginTop: 20,
    fontSize: 18,
    color: "#4caf50",
  },
  summaryContainer: {
    marginTop: 40,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  summaryText: {
    fontSize: 16,
    color: "#333",
  },
});
