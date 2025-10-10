import { collection, getDocs, orderBy, query, where, deleteDoc, doc, DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert, ListRenderItem } from "react-native";
import { auth, db } from "../utils/firebase";
import { JSX } from "react/jsx-runtime";


interface WeightLog {
  id: string;
  weight?: number;
  email?: string;
  createdAt?: any; // Firestore Timestamp
}

export default function WeightLogs(): JSX.Element {
  const [logs, setLogs] = useState<WeightLog[]>([]);

  const fetchLogs = async (): Promise<void> => {
    try {
      const q = query(
        collection(db, "weightLogs"),
        where("uid", "==", auth.currentUser?.uid ?? ""),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const data: WeightLog[] = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as DocumentData),
      }));
      setLogs(data);
    } catch (error) {
      console.log("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const confirmDelete = (id: string): void => {
    Alert.alert(
      "Delete Log",
      "Are you sure you want to delete this log? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => handleDelete(id) },
      ]
    );
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteDoc(doc(db, "weightLogs", id));
      setLogs((prevLogs) => prevLogs.filter((log) => log.id !== id));
    } catch (error) {
      console.log("Error deleting log:", error);
      Alert.alert("Error", "Failed to delete log.");
    }
  };

  const renderItem: ListRenderItem<WeightLog> = ({ item }) => (
    <View style={styles.logItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.weight}>Weight: {item.weight ?? "N/A"} kg</Text>
        {item.email ? <Text style={styles.email}>By: {item.email}</Text> : null}
        <Text style={styles.date}>
          {item.createdAt ? item.createdAt.toDate().toLocaleString() : "No date"}
        </Text>
      </View>
      <TouchableOpacity style={styles.deleteBtn} onPress={() => confirmDelete(item.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Weight Logs</Text>
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No logs yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  logItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  weight: { fontSize: 18, fontWeight: "600" },
  date: { fontSize: 14, color: "#666" },
  email: { fontSize: 14, color: "#333", marginTop: 2 },
  deleteBtn: {
    backgroundColor: "#FF3B30",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteText: { color: "#fff", fontWeight: "600" },
});
