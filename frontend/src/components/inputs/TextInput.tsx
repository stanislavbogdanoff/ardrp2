import { OnChangeFunctionType } from "../../types";

type TextInputProps = {
  onChange?: OnChangeFunctionType;
};

const TextInput = ({ onChange }: TextInputProps) => {
  return <input type="text" onChange={onChange} />;
};

export default TextInput;
