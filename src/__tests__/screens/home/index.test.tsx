import { fireEvent, render, screen } from '@testing-library/react';
import Home from '@/screens/home';

describe('Home Page', () => {
  const setup = () => {
    render(<Home />);
  };

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

  it('shows the invite modal', async () => {
    setup();

    const requestButton = screen.getByText('Request an invite');
    expect(requestButton).toBeInTheDocument();
    fireEvent.click(requestButton);
    expect(screen.getByPlaceholderText('Full name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm email')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });
});
