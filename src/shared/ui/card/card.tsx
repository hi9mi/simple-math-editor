import { mergeClasses } from '@math-editor/shared/lib';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className }: CardProps) => {
  return <div className={mergeClasses('card', className)}>{children}</div>;
};
