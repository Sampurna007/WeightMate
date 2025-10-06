import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { auth, db } from "../utils/firebase";

export default function WeightLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const q = query(
          collection(db, "weightLogs"),
          where("uid", "==", auth.currentUser.uid),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLogs(data);
      } catch (error) {
        console.log("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.logItem}>
      <Text style={styles.weight}>Weight: {item.weight} kg</Text>
      <Text style={styles.date}>
        {item.createdAt.toDate().toLocaleString()}
      </Text>
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
  logItem: { padding: 15, borderBottomWidth: 1, borderColor: "#ddd" },
  weight: { fontSize: 18, fontWeight: "600" },
  date: { fontSize: 14, color: "#666" },
});
