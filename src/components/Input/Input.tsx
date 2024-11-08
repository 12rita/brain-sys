import { ChangeEvent, FC, InputHTMLAttributes, useCallback, useState } from 'react';
import styles from './styles.module.css';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChangeInput: (value: string) => void;
  className?: string;
}

export const Input: FC<IInput> = ({ value, onChangeInput, className, ...otherProps }) => {
  const [error, setError] = useState(false);
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (error) setError(false);
      onChangeInput(e.target?.value?.trim());
    },
    [error, onChangeInput]
  );

  const handleBlur = useCallback(() => {
    if (!otherProps.pattern) return;
    const regexp = new RegExp(otherProps.pattern);
    const isValid = regexp.test(value);
    if (!isValid) setError(true);
  }, [otherProps.pattern, value]);

  return (
    <input
      className={`${className} ${error ? styles.error : ''}`}
      onBlur={handleBlur}
      value={value}
      onChange={handleChange}
      {...otherProps}
    />
  );
};
