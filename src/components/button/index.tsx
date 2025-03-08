import { EColors } from '@/themes';
import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import LoadingSpinner from '../loading-spinner';

interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    IStyledButtonProps {}

interface IStyledButtonProps {
  $isFullWidth?: boolean;
  $loading?: boolean;
}

const Button = ({
  children,
  $isFullWidth,
  $loading,
  ...rest
}: IButtonProps) => {
  return (
    <StyledButton {...rest} disabled={$loading} $isFullWidth={$isFullWidth}>
      {$loading && <LoadingSpinner />}
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<IStyledButtonProps>`
  width: ${({ $isFullWidth }) => ($isFullWidth ? '100%' : 'auto')};
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background 0.3s ease,
    transform 0.2s ease;

  background: ${EColors.PRIMARY};
  color: ${EColors.WHITE};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: ${EColors.ACCENT};
    transform: translateY(-2px);
  }

  &:disabled {
    background: ${EColors.LIGHT_GRAY};
    color: ${EColors.BLACK};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
