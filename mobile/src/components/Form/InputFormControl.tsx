import { Control, Controller } from 'react-hook-form';
import { TextInput } from 'react-native';
import { SignInFormData } from 'src/features/Auth/types';

interface InputFormControlProps {
  type: 'emailAddress' | 'password';
  placeholder: string;
  control: Control<SignInFormData>;

  required: boolean;
  validationPattern?: RegExp;
  controlName: 'password' | 'email';
  inputMode?: 'text' | 'email';
}

export function InputFormControl({
  type,
  inputMode = 'text',
  placeholder,
  controlName,
  control,
  validationPattern,
  required,
}: InputFormControlProps) {
  return (
    <Controller
      control={control}
      rules={{ required, pattern: validationPattern }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          inputMode={inputMode}
          placeholder={placeholder}
          secureTextEntry={type === 'password'}
          textContentType={type}
          value={value}
          onBlur={onBlur}
          onChangeText={onChange}
        />
      )}
      name={controlName}
    />
  );
}
