import { Button } from "@/components/Button";
import { Picker } from "@/components/Picker";

import { Switch } from "@/components/Switch";
import TextInput from "@/components/TextInput";
import { toast } from "@/components/Toast";
import { Check, X } from "lucide-react-native";
import { SafeAreaView, ScrollView } from "react-native";
import { SectionList, View } from "react-native";

export default function CompoScreen() {
  const sections = [
    {
      title: "section1",
      data: [
        {
          type: "controls",
          content: (
            <>
              <Switch />
              <Switch thumbOnIcon={<Check size={12} color="gray" />} thumbOffIcon={<X size={12} color="gray" />} />
              <TextInput label="Username" placeholder="Enter your username" />
              <Picker label="Options" options={options} placeholder="Choose an option" searchable />
            </>
          ),
        },
        {
          type: "forms",
          content: (
            <>
              <TextInput label="Password" placeholder="Enter your password" variant="outline" />
              <Picker
                label="Select Option"
                options={options2}
                fieldNames={{ label: "name", value: "code" }}
                variant="outline"
                placeholder="Choose an option"
                mode="normal"
                searchable
              />
              <Picker label="Select Option" options={options} variant="outline" placeholder="Choose an option" mode="modal" searchable />
              <Picker label="Select Option" options={options} variant="outline" placeholder="Choose an option" mode="fullModal" searchable />
            </>
          ),
        },
        {
          type: "buttons",
          content: (
            <>
              <Button onPress={() => toast.success("Success", { duration: 4000, mode: "stack" })}>Primary-Slide</Button>
              <Button type="outline" onPress={() => toast.error("Fail", { animation: "bounce", mode: "stack" })}>
                Outline-Bounce
              </Button>
              <Button type="ghost" onPress={() => toast.info("Info message", { mode: "stack" })}>
                Ghost-Update
              </Button>
            </>
          ),
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.type + index}
        renderItem={({ item }) => <View style={{ padding: 16, gap: 16 }}>{item.content}</View>}
        renderSectionHeader={() => null}
        stickySectionHeadersEnabled={false}
      />
    </SafeAreaView>
  );
}

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

const options2 = [
  { name: "Option 1", code: "1" },
  { name: "Option 2", code: "2" },
  { name: "Option 3", code: "3" },
];
