import { apiSendInvitation, ISendInvitation } from '@/api';
import Button from '@/components/button';
import FormItem from '@/components/form-item';
import { PATTERNS } from '@/constants/patterns';
import { VALIDATION_MSG } from '@/constants/validation-messages';
import { getApiErrorMessage } from '@/request';
import { EColors } from '@/themes';
import { FC, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { styled } from 'styled-components';

interface IFormInput extends ISendInvitation {
  confirmEmail: string;
}

interface IInviteModalForm {
  onSubmitSuccess: () => void;
}

const InviteModalForm: FC<IInviteModalForm> = ({ onSubmitSuccess }) => {
  const abortControllerRef = useRef<AbortController | null>(null);
  const { register, handleSubmit, watch, formState, trigger } =
    useForm<IFormInput>({ mode: 'onChange' });

  const { errors, isSubmitting } = formState;
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const { name, email } = data;
    const params = { name, email };
    try {
      await apiSendInvitation(params, controller.signal);
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

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

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
