import { useRouter } from "expo-router";
import { signOut, updateEmail, updatePassword, User } from "firebase/auth";
import { collection, DocumentData, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { JSX } from "react/jsx-runtime";
import { auth, db } from "../utils/firebase";


const PRIMARY_COLOR = "#00CC66"; // green

export default function Profile(): JSX.Element {
  const [userEmail, setUserEmail] = useState<string>("");
  const [currentWeight, setCurrentWeight] = useState<string>("N/A");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const router = useRouter();

  // Load current user email
  useEffect(() => {
    const user: User | null = auth.currentUser;
    if (user?.email) {
      setUserEmail(user.email);
    }
  }, []);

  // Fetch latest weight log
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
          const doc: DocumentData = querySnapshot.docs[0].data();
          if (doc.weight) {
            setCurrentWeight(doc.weight + " kg");
          }
        }
      } catch (error) {
        console.log("Error fetching weight:", error);
      }
    };

    fetchWeight();
  }, []);

  // Change Email
  const handleChangeEmail = async (): Promise<void> => {
    try {
      if (!newEmail) {
        Alert.alert("Error", "Please enter a new email");
        return;
      }
      if (!auth.currentUser) {
        Alert.alert("Error", "No user logged in");
        return;
      }
      await updateEmail(auth.currentUser, newEmail);
      setUserEmail(newEmail);
      Alert.alert("Success", "Email updated!");
      setNewEmail("");
    } catch (error: any) {
      Alert.alert("Update Failed", error.message);
    }
  };

  // Change Password
  const handleChangePassword = async (): Promise<void> => {
    try {
      if (!newPassword) {
        Alert.alert("Error", "Please enter a new password");
        return;
      }
      if (!auth.currentUser) {
        Alert.alert("Error", "No user logged in");
        return;
      }
      await updatePassword(auth.currentUser, newPassword);
      Alert.alert("Success", "Password updated!");
      setNewPassword("");
    } catch (error: any) {
      Alert.alert("Update Failed", error.message);
    }
  };

  // Logout
  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth);
      router.replace("/Authentication/Login");
    } catch (error: any) {
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
