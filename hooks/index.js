import { useState } from "react";

export const useField = (type = "text") => {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.currentTarget.value);
  };
  const reset = () => setValue("");
  return { reset, setValue, attr: { value, onChange, type } };
};
