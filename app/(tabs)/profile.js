import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { auth, db } from "../utils/firebase";
import { signOut, updateEmail, updatePassword } from "firebase/auth";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { useRouter } from "expo-router";

const PRIMARY_COLOR = "#00CC66"; // green

export default function Profile() {
  const [userEmail, setUserEmail] = useState("");
  const [currentWeight, setCurrentWeight] = useState("N/A");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    }
  }, []);

  useEffect(() => {
    const fetchWeight = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const q = query(
          collection(db, "weightLogs"),
          where("uid", "==", user.uid),
          orderBy("createdAt", "desc"),
          limit(1)
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0].data();
          setCurrentWeight(doc.weight + " kg");
        }
      } catch (error) {
        console.log("Error fetching weight:", error);
      }
    };

    fetchWeight();
  }, []);

  const handleChangeEmail = async () => {
    try {
      if (!newEmail) {
        Alert.alert("Error", "Please enter a new email");
        return;
      }
      await updateEmail(auth.currentUser, newEmail);
      setUserEmail(newEmail);
      Alert.alert("Success", "Email updated!");
      setNewEmail("");
    } catch (error) {
      Alert.alert("Update Failed", error.message);
    }
  };

  const handleChangePassword = async () => {
    try {
      if (!newPassword) {
        Alert.alert("Error", "Please enter a new password");
        return;
      }
      await updatePassword(auth.currentUser, newPassword);
      Alert.alert("Success", "Password updated!");
      setNewPassword("");
    } catch (error) {
      Alert.alert("Update Failed", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/Authentication/Login");
    } catch (error) {
      Alert.alert("Logout Failed", error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Picture & Email */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/default-profile.png")}
          style={styles.profilePic}
        />
        <Text style={styles.email}>{userEmail}</Text>
        <Text style={styles.weight}>Current Weight: {currentWeight}</Text>
      </View>

      {/* Change Email */}
      <View style={styles.section}>
        <Text style={styles.label}>Change Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter new email"
          placeholderTextColor="#888"
          value={newEmail}
          onChangeText={setNewEmail}
        />
        <TouchableOpacity style={styles.greenButton} onPress={handleChangeEmail}>
          <Text style={styles.buttonText}>Update Email</Text>
        </TouchableOpacity>
      </View>

      {/* Change Password */}
      <View style={styles.section}>
        <Text style={styles.label}>Change Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter new password"
          placeholderTextColor="#888"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity style={styles.greenButton} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Update Password</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { alignItems: "center", marginVertical: 20 },
  profilePic: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  email: { fontSize: 18, fontWeight: "600", color: "#000", marginBottom: 5 },
  weight: { fontSize: 14, color: "#444" },
  section: { marginVertical: 15, paddingHorizontal: 20 },
  label: { fontSize: 16, color: "#000", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#fff",
  },
  greenButton: {
    marginTop: 10,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  logoutButton: {
    marginHorizontal: 20,
    marginVertical: 30,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  logoutText: { color: PRIMARY_COLOR, fontSize: 16, fontWeight: "600" },
});
