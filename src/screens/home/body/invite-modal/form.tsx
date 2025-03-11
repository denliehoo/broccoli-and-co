import { apiSendInvitation, ISendInvitation } from '@/api';
import Button from '@/components/button';
import FormItem from '@/components/form-item';
import { API_ERROR_MESSAGE } from '@/constants/api-error-message';
import { PATTERNS, RANGE_PATTERNS } from '@/constants/patterns';
import { VALIDATION_MSG } from '@/constants/validation-messages';
import { EInviteModalContent, useInviteModal } from '@/context/invite-modal';
import { useAbortController } from '@/hooks/use-abort-controller';
import { getApiErrorMessage } from '@/request';
import { EColors } from '@/themes';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { styled } from 'styled-components';

export interface IFormInput extends ISendInvitation {
  confirmEmail: string;
}

const InviteModalForm: FC = () => {
  const { setContent } = useInviteModal();
  const { register, handleSubmit, watch, formState, trigger, setFocus } =
    useForm<IFormInput>({ mode: 'onChange' });

  const { errors, isSubmitting } = formState;
  const [submitError, setSubmitError] = useState<string | null>(null);

  const createAbortController = useAbortController();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const signal = createAbortController();

    const { name, email } = data;
    const params = { name, email: email.toLowerCase() };
    try {
      await apiSendInvitation(params, signal);
      setContent(EInviteModalContent.SUCCESS);
    } catch (error) {
      const errorMessage = getApiErrorMessage(error);
      setSubmitError(errorMessage);
      if (errorMessage === API_ERROR_MESSAGE.EMAIL_IN_USE) {
        setTimeout(() => setFocus('email'), 100);
      }
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

  const onValidateConfirmEmail = (value: string) => {
    if (value.toLowerCase() === watch('email').toLowerCase()) {
      return true;
    }
    return VALIDATION_MSG.VALIDATE.MATCH_EMAIL;
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormItem
        label="Full name"
        register={register('name', {
          required: VALIDATION_MSG.REQUIRED.NAME,
          minLength: RANGE_PATTERNS.MIN_LENGTH('Name', 3),
          maxLength: RANGE_PATTERNS.MAX_LENGTH('Name', 100),
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
          validate: onValidateConfirmEmail,
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
