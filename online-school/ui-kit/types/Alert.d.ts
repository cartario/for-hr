export type Variants = 'filled' | 'outlined' | 'standard';
export type Colors = 'error' | 'info' | 'success' | 'warning'; 

export type AlertProps = {
  color?: Colors;
  variant?: Variants;
  severity?: Colors;
  className?: string;
  title?: string;
  message: string;
  action?: {
    name: string;
    cb: () => void;
  };
};