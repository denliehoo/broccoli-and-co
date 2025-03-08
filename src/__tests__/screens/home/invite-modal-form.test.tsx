import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
  Screen,
} from '@testing-library/react';
import InviteModalForm from '@/screens/home/body/invite-modal/form';
import axios from 'axios';
import { VALIDATION_MSG } from '@/constants/validation-messages';

describe('InviteModalForm', () => {
  const setup = () => {
    const onSubmitSuccess = jest.fn();
    const component = render(
      <InviteModalForm onSubmitSuccess={onSubmitSuccess} />,
    );
    return {
      fullNameField: screen.getByPlaceholderText('Full name'),
      emailField: screen.getByPlaceholderText('Email'),
      confirmEmailField: screen.getByPlaceholderText('Confirm email'),
      submitButton: screen.getByText(/Submit/i),
      onSubmitSuccess,
      component,
    };
  };

  it('renders the form', () => {
    const { fullNameField, emailField, confirmEmailField } = setup();

    expect(fullNameField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(confirmEmailField).toBeInTheDocument();
  });

  it('shows required validation message for all fields', async () => {
    const { submitButton } = setup();

    fireEvent.click(submitButton);

    const nameErrors = await screen.findAllByText(VALIDATION_MSG.REQUIRED.NAME);
    expect(nameErrors.length).toBeGreaterThan(0);

    expect(screen.getByText(VALIDATION_MSG.REQUIRED.NAME)).toBeInTheDocument();

    const emailErrors = await screen.findAllByText(
      VALIDATION_MSG.REQUIRED.EMAIL,
    );
    expect(emailErrors.length).toEqual(2);
  });

  it('shows full name min length validation', async () => {
    const { fullNameField, submitButton } = setup();

    // Min 3 character
    fireEvent.change(fullNameField, { target: { value: 'To' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(VALIDATION_MSG.MIN_LENGTH.NAME),
      ).toBeInTheDocument();
    });
  });

  it('shows email pattern validation', async () => {
    const { emailField, confirmEmailField, submitButton } = setup();
    fireEvent.change(emailField, { target: { value: 'wrongemailformat' } });
    fireEvent.change(confirmEmailField, {
      target: { value: 'wrongemailformat' },
    });

    fireEvent.click(submitButton);

    const emailErrors = await screen.findAllByText(
      VALIDATION_MSG.PATTERNS.EMAIL,
    );
    expect(emailErrors.length).toEqual(2);
  });

  it('shows email should match validation', async () => {
    const { emailField, confirmEmailField, submitButton } = setup();

    fireEvent.change(emailField, { target: { value: 'test@email.com' } });
    fireEvent.change(confirmEmailField, {
      target: { value: 'different@email.com' },
    });

    fireEvent.click(submitButton);

    screen.debug();
    await waitFor(() => {
      expect(
        screen.getByText(VALIDATION_MSG.VALIDATE.MATCH_EMAIL),
      ).toBeInTheDocument();
    });
  });

  it('shows submit error when email is already in use', async () => {
    const { submitButton } = setup();

    await simulateValidatedInviteFormSubmission(screen, false);

    await waitFor(() => {
      expect(
        screen.getByText(/Bad Request: Email is already in use/i),
      ).toBeInTheDocument();
    });

    expect(submitButton).not.toBeDisabled();
  });
});

export const simulateValidatedInviteFormSubmission = async (
  screen: Screen<typeof import('@testing-library/dom/types/queries')>,
  isApiSuccess: boolean,
) => {
  if (isApiSuccess) {
    jest.spyOn(axios, 'post').mockResolvedValue({});
  } else {
    jest.spyOn(axios, 'post').mockRejectedValue({
      response: {
        data: { errorMessage: 'Bad Request: Email is already in use' },
      },
    });
  }
  const fullNameField = screen.getByPlaceholderText('Full name');
  const emailField = screen.getByPlaceholderText('Email');
  const confirmEmailField = screen.getByPlaceholderText('Confirm email');
  const submitButton = screen.getByText(/Submit/i);

  fireEvent.change(fullNameField, { target: { value: 'Test Name' } });
  fireEvent.change(emailField, { target: { value: 'test@test.com' } });
  fireEvent.change(confirmEmailField, { target: { value: 'test@test.com' } });

  await act(async () => {
    fireEvent.click(submitButton);
  });
};
