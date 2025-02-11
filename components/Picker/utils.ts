import { PickerFieldNames, PickerOption } from "./types";

export const DEFAULT_FIELD_NAMES: PickerFieldNames = {
  label: "label",
  value: "value",
};

export function mapOptionsWithFieldNames<T extends Record<string, any>>(options: T[], fieldNames?: PickerFieldNames<T>): PickerOption<T>[] {
  const actualFieldNames = { ...DEFAULT_FIELD_NAMES, ...fieldNames } as PickerFieldNames<T>;

  return options.map((item) => ({
    label: String(item[actualFieldNames.label] ?? ""),
    value: String(item[actualFieldNames.value] ?? ""),
    original: item,
  }));
}
