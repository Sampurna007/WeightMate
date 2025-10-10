import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { JSX } from "react/jsx-runtime";

export default function BMI(): JSX.Element {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [bmi, setBmi] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("");

  const calculateBMI = (): void => {
    if (!height || !weight || !age) {
      setBmi(null);
      setCategory("Please enter all fields.");
      return;
    }

    const hMeters = parseFloat(height) / 100;
    const wKg = parseFloat(weight);
    const bmiValue = wKg / (hMeters * hMeters);

    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) setCategory("Underweight");
    else if (bmiValue < 25) setCategory("Healthy Weight");
    else if (bmiValue < 30) setCategory("Overweight");
    else setCategory("Obese");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>

      <TextInput
        placeholder="Enter height (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
        style={styles.input}
      />

      <TextInput
        placeholder="Enter weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        style={styles.input}
      />

      <TextInput
        placeholder="Enter age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={calculateBMI}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>

      {bmi && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>Your BMI: {bmi}</Text>
          <Text style={styles.category}>Category: {category}</Text>
        </View>
      )}

      {/* BMI Chart Image */}
      <View style={styles.chartContainer}>
        <Text style={styles.indexTitle}>Standard Adult BMI Ranges</Text>
        <Image
          source={require("../../assets/indexbmi.png")}
          style={styles.chartImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  resultContainer: { alignItems: "center", marginBottom: 20 },
  result: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  category: { fontSize: 18, color: "#555" },
  chartContainer: { marginTop: 20, alignItems: "center" },
  indexTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  chartImage: { width: "100%", height: 200 },
});
