import { memo } from 'react';
import { MathJax } from 'better-react-mathjax';
import { mergeClasses } from '@math-editor/shared/lib';

type MathPreviewProps = {
  latex: string;
  className?: string;
};

export const MathPreview = memo(({ latex, className }: MathPreviewProps) => {
  return (
    <MathJax
      className={mergeClasses('text-xl', className)}
      dynamic={true}
    >{`\\(${latex}\\)`}</MathJax>
  );
});

MathPreview.displayName = 'MathPreview';
