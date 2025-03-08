import { FC, HTMLInputTypeAttribute } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';
import Input from '../input';
import { EColors } from '@/themes';

interface FormItemProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  disabled?: boolean;
}

const FormItem: FC<FormItemProps> = ({
  label,
  register,
  error,
  type = 'text',
  placeholder,
  disabled,
}) => {
  return (
    <StyledContainer>
      <StyledLabel>{label}</StyledLabel>
      <Input
        {...register}
        disabled={disabled}
        type={type}
        placeholder={placeholder ?? label}
        $isError={Boolean(error)}
        label="Full"
      />
      {error && <StyledError>{error.message}</StyledError>}
    </StyledContainer>
  );
};

export default FormItem;

const StyledContainer = styled.div`
  height: 6rem;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.2rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${EColors.BLACK};
`;

const StyledError = styled.span`
  color: ${EColors.ERROR};
  font-size: 0.8rem;
  margin-top: 0.2rem;
  display: block;
  font-weight: 400;
`;
