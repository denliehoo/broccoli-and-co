import { EColors } from '@/themes';
import { FC, HTMLProps } from 'react';
import styled from 'styled-components';

interface IStyledInput {
  $isError?: boolean;
}

export interface IInput extends IStyledInput, HTMLProps<HTMLInputElement> {}

const Input: FC<IInput> = (props) => {
  return <StyledInput {...props} />;
};

export default Input;

const StyledInput = styled.input<IStyledInput>`
  width: 100%;
  padding: 12px;
  font-size: 1 rem;
  border: 2px solid
    ${({ $isError }) => ($isError ? EColors.ERROR : EColors.GRAY)};
  border-radius: 8px;
  background: ${EColors.WHITE};
  color: ${EColors.BLACK};
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ $isError }) =>
      $isError ? EColors.ERROR : EColors.PRIMARY};
    box-shadow: 0 0 5px
      ${({ $isError }) => ($isError ? EColors.ERROR : EColors.SECONDARY)};
  }

  &:disabled {
    background: ${EColors.LIGHT_GRAY};
    border-color: ${EColors.BACKGROUND};
    color: ${EColors.BLACK};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
