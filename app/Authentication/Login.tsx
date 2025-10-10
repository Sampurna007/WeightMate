import { useRouter } from "expo-router";
import { sendPasswordResetEmail, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../utils/firebase";
import { JSX } from "react/jsx-runtime";


export default function Login(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (): Promise<void> => {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        Alert.alert("Please verify your email before logging in.");
        return;
      }

      Alert.alert("Welcome back!");
    router.replace({ pathname: "/(tabs)/Home" });
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    }
  };

  const handleForgotPassword = async (): Promise<void> => {
    if (!email) {
      Alert.alert("Error", "Enter your email to reset password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Password Reset", "Check your email for reset instructions.");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/Authentication/Register")}>
        <Text style={styles.link}>Don’t have an account? Register</Text>
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
