import { StylesConfig } from "react-select";
import { Organization } from "../entity/Organization.ts";

const customStylesOrganization: StylesConfig<Organization, false> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#222",
    borderColor: "#444",
    color: "white",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "4px",
    cursor: "pointer",
    "&:hover": {
      borderColor: "#666",
    },
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: "#333",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    borderRadius: "4px",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isFocused ? "#444" : "transparent",
    color: "white",
    cursor: "pointer",
    ":active": {
      ...styles[":active"],
      backgroundColor: isSelected ? "#555" : "#444",
    },
    borderBottom: "1px solid #555", // Thin line between options
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "white",
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "#aaa",
  }),
  input: (styles) => ({
    ...styles,
    color: "white",
  }),
};

export default customStylesOrganization;
