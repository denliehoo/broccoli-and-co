import { apiSendInvitation, ISendInvitation } from '@/api';
import Button from '@/components/button';
import FormItem from '@/components/form-item';
import { PATTERNS } from '@/constants/patterns';
import { VALIDATION_MSG } from '@/constants/validation-messages';
import { useAbortController } from '@/hooks/use-abort-controller';
import { getApiErrorMessage } from '@/request';
import { EColors } from '@/themes';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { styled } from 'styled-components';

export interface IFormInput extends ISendInvitation {
  confirmEmail: string;
}

interface IInviteModalForm {
  onSubmitSuccess: () => void;
}

const InviteModalForm: FC<IInviteModalForm> = ({ onSubmitSuccess }) => {
  const { register, handleSubmit, watch, formState, trigger } =
    useForm<IFormInput>({ mode: 'onChange' });

  const { errors, isSubmitting } = formState;
  const [submitError, setSubmitError] = useState<string | null>(null);

  const createAbortController = useAbortController();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const signal = createAbortController();

    const { name, email } = data;
    const params = { name, email };
    try {
      await apiSendInvitation(params, signal);
      onSubmitSuccess();
    } catch (error) {
      const errorMessage = getApiErrorMessage(error);
      setSubmitError(errorMessage);
    }
  };

  const resetSubmitError = () => {
    if (submitError) {
      setSubmitError(null);
    }
  };

  const onEmailFieldChange = () => {
    resetSubmitError();
    if (watch('confirmEmail')) {
      trigger('confirmEmail');
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormItem
        label="Full name"
        register={register('name', {
          required: VALIDATION_MSG.REQUIRED.NAME,
          minLength: {
            value: 3,
            message: VALIDATION_MSG.MIN_LENGTH.NAME,
          },
          onChange: resetSubmitError,
        })}
        error={errors.name}
        disabled={isSubmitting}
      />
      <FormItem
        label="Email"
        register={register('email', {
          required: VALIDATION_MSG.REQUIRED.EMAIL,
          pattern: PATTERNS.EMAIL,
          onChange: onEmailFieldChange,
        })}
        error={errors.email}
        disabled={isSubmitting}
      />
      <FormItem
        label="Confirm email"
        register={register('confirmEmail', {
          required: VALIDATION_MSG.REQUIRED.EMAIL,
          pattern: PATTERNS.EMAIL,
          validate: (value) =>
            value === watch('email') || VALIDATION_MSG.VALIDATE.MATCH_EMAIL,
          onChange: resetSubmitError,
        })}
        error={errors.confirmEmail}
        disabled={isSubmitting}
      />

      <Button type="submit" $isFullWidth $loading={isSubmitting}>
        Submit
      </Button>
      {submitError && <StyledError>{submitError}</StyledError>}
    </StyledForm>
  );
};

export default InviteModalForm;

const StyledForm = styled.form`
  width: 100%;
`;

const StyledError = styled.div`
  color: ${EColors.ERROR};
  text-align: center;
  font-size: 0.8rem;
  margin-top: 0.2rem;
`;
