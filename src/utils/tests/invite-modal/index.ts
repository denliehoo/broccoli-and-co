import { API_ERROR_MESSAGE } from '@/constants/api-error-message';
import {
  EInviteModalContent,
  IInviteModalContext,
  useInviteModal,
} from '@/context/invite-modal';
import { act, fireEvent, render, Screen } from '@testing-library/react';
import axios from 'axios';
import { ReactNode } from 'react';

export const setupWithUseInviteModalContext = (
  component: ReactNode,
  isOpen: boolean,
) => {
  const mockSetContent = jest.fn();
  const mockCloseModal = jest.fn();
  const mockOpenModal = jest.fn();

  // Mock the context
  (useInviteModal as jest.Mock).mockReturnValue({
    isOpen,
    openModal: mockOpenModal,
    closeModal: mockCloseModal,
    content: isOpen ? EInviteModalContent.FORM : undefined,
    setContent: mockSetContent,
  } as IInviteModalContext);

  render(component);

  return {
    mockSetContent,
    mockCloseModal,
    mockOpenModal,
  };
};

type TScreen = Screen<typeof import('@testing-library/dom/types/queries')>;

export const simulateValidatedInviteFormSubmission = async (
  screen: TScreen,
  isApiSuccess: boolean,
) => {
  if (isApiSuccess) {
    jest.spyOn(axios, 'post').mockResolvedValue({});
  } else {
    jest.spyOn(axios, 'post').mockRejectedValue({
      response: {
        data: { errorMessage: API_ERROR_MESSAGE.EMAIL_IN_USE },
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
