export interface IconButtonProps {
  isLoading?: boolean;
  size?: 'lg' | 'md' | 'sm' | 'xs';
  colorVariant?: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  variant?: 'ghost' | 'outline' | 'solid' | 'link' | 'unstyled';
  onClick: () => void;
}
