import { ISendInvitation } from '@/api';
import Button from '@/components/button';
import FormItem from '@/components/form-item';
import { PATTERNS } from '@/constants/patterns';
import { VALIDATION_MSG } from '@/constants/validation-messages';
import { getApiErrorMessage } from '@/request';
import { EColors } from '@/themes';
import axios from 'axios';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { styled } from 'styled-components';

interface IFormInput extends ISendInvitation {
  confirmEmail: string;
}

interface IInviteModalForm {
  onSubmitSuccess: () => void;
}

const InviteModalForm: FC<IInviteModalForm> = ({ onSubmitSuccess }) => {
  const { register, handleSubmit, watch, formState } = useForm<IFormInput>();

  const { errors, isSubmitting } = formState;
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(`Submitting data:`, data);

    const { name, email } = data;
    const params = { name, email };
    // Simulate failure
    // const params = { email: 'usedemail@airwallex.com', name };
    try {
      await axios.post(
        'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
        params,
      );
      // await apiSendInvitation(params);
      onSubmitSuccess();
    } catch (error) {
      // console.log(error);
      const errorMessage = getApiErrorMessage(error);
      // console.log('setting error message', errorMessage);
      setSubmitError(errorMessage);
    }
    // setSubmitError('Bad Request: Email is already in use');
    // console.log('set error');
    // onSubmitSuccess();
  };

  const resetSubmitError = () => {
    if (submitError) {
      setSubmitError(null);
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
          onChange: resetSubmitError,
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
