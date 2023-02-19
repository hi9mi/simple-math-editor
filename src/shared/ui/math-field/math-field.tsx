import { useEffect, useLayoutEffect, useRef } from 'react';
import type { MathfieldElement } from 'mathlive';
import 'mathlive';

type MathFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export const MathField = ({ value, onChange }: MathFieldProps) => {
  const mathFieldRef = useRef<MathfieldElement>(null);

  useLayoutEffect(() => {
    const mathFieldElement = mathFieldRef.current;

    if (mathFieldElement) {
      mathFieldElement.setOptions({
        virtualKeyboardMode: 'manual',
      });
    }
  }, []);

  useEffect(() => {
    const mathFieldElement = mathFieldRef.current;

    if (value === '' && mathFieldElement) {
      mathFieldElement.executeCommand('deleteAll');
    }
  }, [value]);

  const handleOnInput = () => {
    if (mathFieldRef.current) {
      onChange(mathFieldRef.current.getValue('latex-unstyled'));
    }
  };

  return (
    <math-field
      value={value}
      onInput={handleOnInput}
      ref={mathFieldRef}
      sounds-directory="https://unpkg.com/mathlive@0.84.0/dist/sounds/"
      fonts-directory="https://unpkg.com/mathlive@0.84.0/dist/fonts/"
    ></math-field>
  );
};
