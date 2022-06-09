import { ButtonVariants, Sizes, ColorVariants } from '@/styles/types';

export interface IconButtonProps {
  isLoading?: boolean;
  colorVariant?: ColorVariants;
  margin?: string | string[];
  size?: Sizes;
  variant?: ButtonVariants;
  onClick: () => void;
}
