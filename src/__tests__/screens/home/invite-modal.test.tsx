import { screen } from '@testing-library/react';
import InviteModal from '@/screens/home/body/invite-modal';

import {
  EInviteModalContent,
  INVITE_MODAL_TITLE,
} from '@/context/invite-modal';
import { API_ERROR_MESSAGE } from '@/constants/api-error-message';
import {
  setupWithUseInviteModalContext,
  simulateValidatedInviteFormSubmission,
} from '@/utils/tests';

jest.mock('@/context/invite-modal');

describe('InviteModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = () => setupWithUseInviteModalContext(<InviteModal />, true);

  it('displays the form content upon opening modal', async () => {
    setup();

    expect(
      screen.getByText(INVITE_MODAL_TITLE[EInviteModalContent.FORM]),
    ).toBeInTheDocument();
  });

  it('remains at form content after unsuccessful form submission', async () => {
    setup();
    await simulateValidatedInviteFormSubmission(screen, false);

    expect(
      screen.queryByText(API_ERROR_MESSAGE.EMAIL_IN_USE),
    ).toBeInTheDocument();
  });

  it('switches to success content after successful form submission', async () => {
    const { mockSetContent } = setup();

    await simulateValidatedInviteFormSubmission(screen, true);

    // Verify that setContent was called with SUCCESS
    expect(mockSetContent).toHaveBeenCalledWith(EInviteModalContent.SUCCESS);

    screen.debug();
  });
});
