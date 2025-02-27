import { AlertCircle, AlertTriangle, CheckCircle2, HelpCircle, Info } from "lucide-react-native";
import { DialogType } from "../types";
import { DialogTypeConfig } from "../constants/config";

export function getDialogIcon(type: DialogType): React.ReactNode {
  const config = DialogTypeConfig[type];

  switch (type) {
    case "success":
      return <CheckCircle2 {...config} />;
    case "error":
      return <AlertCircle {...config} />;
    case "warning":
      return <AlertTriangle {...config} />;
    case "info":
      return <Info {...config} />;
    default:
    case "confirm":
      return <HelpCircle {...config} />;
      return null;
  }
}
