import { ButtonVariants, Sizes, ColorVariants } from '@/styles/types';

export interface IconButtonProps {
  ariaLabel: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  colorVariant?: ColorVariants;
  margin?: string | string[];
  size?: Sizes;
  variant?: ButtonVariants;
  color?: string;
  onClick: () => void;
}
