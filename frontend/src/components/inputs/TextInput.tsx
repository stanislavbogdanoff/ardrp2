import { OnChangeFunctionType } from "../../types";

type TextInputProps = {
  onChange?: OnChangeFunctionType;
  placeholder?: string;
};

const TextInput = ({ onChange, placeholder }: TextInputProps) => {
  return <input type="text" placeholder={placeholder} onChange={onChange} />;
};

export default TextInput;
