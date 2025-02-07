import { Button } from "@/components/Button";
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
        <TextInput label="Password" placeholder="Enter your password" variant="outline" />
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
