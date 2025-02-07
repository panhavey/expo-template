import { Text } from "@/components/Text";
import TextInput from "@/components/TextInput";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView, ScrollView, View } from "react-native";

export default function CompoScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <TextInput label="Username" placeholder="Enter your username" />

        <TextInput label="Password" placeholder="Enter your password" variant="outline" />
      </ScrollView>
    </SafeAreaView>
  );
}
