import { useRouter } from "expo-router";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from "../utils/firebase";

export default function Home() {
  const [weight, setWeight] = useState("");
  const router = useRouter();

  const handleAddWeight = async () => {
    if (!weight) {
      Alert.alert("Error", "Please enter a weight");
      return;
    }

    try {
      await addDoc(collection(db, "weightLogs"), {
        uid: auth.currentUser.uid,
        weight: parseFloat(weight),
        createdAt: Timestamp.now(),
      });

      Alert.alert("Success", "Weight recorded successfully!");
      setWeight("");
    } catch (error) {
      Alert.alert("Error saving weight", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to WeightMate</Text>
      <Text style={styles.subtitle}>Log your current weight below:</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter weight (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleAddWeight}>
        <Text style={styles.buttonText}>Save Weight</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/WeightLogs/Weightlogs")}>
        <Text style={styles.link}>View Weight Logs</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 20 },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  link: { fontSize: 16, color: "#34C759" },
});
