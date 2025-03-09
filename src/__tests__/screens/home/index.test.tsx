import { fireEvent, screen } from '@testing-library/react';
import Home from '@/screens/home';
import { setupWithUseInviteModalContext } from '@/utils/tests';

// Note: It is necessary to mock the context at the top when we use it
jest.mock('@/context/invite-modal');

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = () => setupWithUseInviteModalContext(<Home />, false);

  it('shows the header', async () => {
    setup();

    const headerText = screen.getByText('BROCCOLI & CO.');
    expect(headerText).toBeInTheDocument();
  });

  it('shows the body', async () => {
    setup();

    const bodyText = screen.getByText('Request an invite');
    expect(bodyText).toBeInTheDocument();
  });

  it('shows the footer', async () => {
    setup();

    const footerText = screen.getByText(/All rights reserved./i);
    expect(footerText).toBeInTheDocument();
  });

  it('opens invite modal on click button', async () => {
    const { mockOpenModal } = setup();

    screen.debug();
    const requestButton = screen.getByText('Request an invite');
    expect(requestButton).toBeInTheDocument();
    fireEvent.click(requestButton);
    expect(mockOpenModal).toHaveBeenCalled();
  });
});
