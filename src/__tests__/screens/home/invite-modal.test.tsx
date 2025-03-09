import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import InviteModal from '@/screens/home/body/invite-modal';
import { simulateValidatedInviteFormSubmission } from './invite-modal-form.test';

describe('InviteModal', () => {
  const setIsModalOpen = jest.fn();

  const setup = (isOpen: boolean) => {
    render(<InviteModal isOpen={isOpen} setIsModalOpen={setIsModalOpen} />);
  };

  it('does not render the modal when isOpen is false', () => {
    setup(false);

    expect(screen.queryByText('Request an invite')).not.toBeInTheDocument();
  });

  it('displays the form content upon opening modal', () => {
    setup(true);

    expect(screen.getByText('Request an invite')).toBeInTheDocument();
    expect(screen.queryByText('All done!')).not.toBeInTheDocument();
  });

  it('remains at form content after unsuccessful form submission', async () => {
    setup(true);

    await simulateValidatedInviteFormSubmission(screen, false);

    expect(screen.queryByText('Request an invite')).toBeInTheDocument();
  });

  it('switches to success content after successful form submission and resets to form content on clicking on', async () => {
    setup(true);

    await simulateValidatedInviteFormSubmission(screen, true);

    await waitFor(() =>
      expect(screen.getByText('All done!')).toBeInTheDocument(),
    );

    expect(screen.queryByText('Request an invite')).not.toBeInTheDocument();

    // Close the modal by clicking ok
    const okButton = screen.getByText('OK');
    expect(okButton).toBeInTheDocument();
    fireEvent.click(okButton);

    expect(screen.queryByText('All done!')).not.toBeInTheDocument();
  });
});
