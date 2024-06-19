import { TextInput, Textarea } from "@mantine/core";
import styles from "./InputField.module.scss";
export default function InputField({
  type,
  label,
  placeholder,
  form,
  name,
  withAsterisk = false,
  ...props
}: any) {
  console.log("name", name);
  return (
    <TextInput
      withAsterisk={withAsterisk}
      label={label}
      placeholder={placeholder}
      {...form.getInputProps(name)}
    />
  );
}

//
var vf8: any = [
  { name: "A", year: "Vin", type: "brand" },
  { name: "A", year: "Vf8", type: "model" },
  { name: "A", year: "2020", type: "year" },
  { name: "A", year: "Vin", type: "brand" },
  { name: "A", year: "Vf9", type: "model" },
  { name: "A", year: "2021", type: "year" },
  { name: "A", year: "2020", type: "year" },
  { name: "B", year: "Vin", type: "brand" },
  { name: "B", year: "Vf8", type: "model" },
  { name: "B", year: "2022", type: "year" },
  { name: "B", year: "Vf9", type: "brand" },
  { name: "C", year: "Vin", type: "brand" },
];

var yearVf8 = ["2020", "2021", "2022"];
// chuyển về mảng 2 chiều
var vF8: any = [
  [
    { name: "A", model: "Vin", index: 0, type: "brand" },
    { name: "A", model: "Vf8", index: 0, type: "model" },
    { name: "A", model: "2021", index: 1, type: "year" },

    // year null

    { name: "A", model: "Vf9", index: 1, type: "model" },
    { name: "A", model: "2021", index: 1, type: "year" },
    { name: "A", year: "2022", index: 1, type: "year" },
  ],
  [
    { name: "B", model: "Vin", index: 2, type: "brand" },
    { name: "B", model: "Vf8", index: 2, type: "model" },
    { name: "B", model: "2022", index: 3, type: "year" },
    { name: "B", model: "Vf9", index: 3, type: "brand" },
  ],
  [{ name: "C", model: "Vin", index: 4, type: "brand" }],
];

var vf8New: any = [];
for (var i = 0; i < vF8?.length - 1; i++) {
  var isNotNull = false;
  for (var j = 0; j < vF8[i]?.length - 1; j++) {
    if (vf8[i].model == "2020") {
      isNotNull = false;
      break;
    } else if (vf8[i].type == "year") {
      if (yearVf8.includes(vf8[i].model)) {
        isNotNull = true;
      }
    }
  }
  if (isNotNull) {
    vF8.delete(vF8[i]);
  }
}
