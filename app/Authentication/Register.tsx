import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, sendEmailVerification, UserCredential } from "firebase/auth";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { JSX } from "react/jsx-runtime";
import { auth } from "../utils/firebase";


export default function Register(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleRegister = async (): Promise<void> => {
    if (!email || !password) {  // validation for email and password field
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firebase templete for email verfivation before registration goes thnrough 
      await sendEmailVerification(user);
      Alert.alert("Success", "Verification email sent. Please verify before logging in.");

      router.replace("/Authentication/Login");
    } catch (error: any) {
      Alert.alert("Registration Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/Authentication/Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
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
    backgroundColor: "#34C759",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  link: { marginTop: 15, fontSize: 16, color: "#007AFF" },
});
