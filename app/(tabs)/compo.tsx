import { Button } from "@/components/Button";
import { Picker } from "@/components/Picker";

import { Switch } from "@/components/Switch";
import TextInput from "@/components/TextInput";
import { toast } from "@/components/Toast";
import { SafeAreaView, ScrollView } from "react-native";

export default function CompoScreen() {
  const handleToast = () => {
    const warningToast = toast.warning("Uploading", { duration: 0 });
    setTimeout(() => {
      toast.update(warningToast, "Suceess", { type: "success" });
    }, 1000);
    setTimeout(() => {
      toast.dismiss(warningToast);
    }, 4000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <Switch />
        <TextInput label="Username" placeholder="Enter your username" />
        <Picker label="Options" options={options} placeholder="Choose an option" searchable />

        <TextInput label="Password" placeholder="Enter your password" variant="outline" />
        <Picker label="Select Option" options={options} variant="outline" placeholder="Choose an option" />

        <>
          <Button onPress={() => toast.success("Success", { duration: 4000, mode: "stack" })}>Primary-Slide</Button>
          <Button type="outline" onPress={() => toast.error("Fail", { animation: "bounce", mode: "stack" })}>
            Outline-Bounce
          </Button>
          <Button type="ghost" onPress={handleToast}>
            Ghost-Update
          </Button>
        </>
      </ScrollView>
    </SafeAreaView>
  );
}

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];
