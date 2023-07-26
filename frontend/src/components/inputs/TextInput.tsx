import { OnChangeFunctionType } from "../../types";
import { FC } from "react";

type TextInputProps = {
  onChange?: OnChangeFunctionType;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const TextInput: FC<TextInputProps> = (props) => {
  return <input {...props} type="text" onChange={props.onChange} />;
};

export default TextInput;
