/// <reference types="vite/client" />

import type { DOMAttributes } from 'react';
import type { MathfieldElementAttributes } from 'mathlive';

type CustomElement<T> = Partial<T & DOMAttributes<T>>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['math-field']: CustomElement<MathfieldElementAttributes>;
    }
  }
}
