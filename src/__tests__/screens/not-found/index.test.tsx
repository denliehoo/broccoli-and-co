import NotFoundPage from '@/screens/not-found';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('NotFoundPage', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows 404 header and description', () => {
    render(<NotFoundPage />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('shows button and redirects to root on click', () => {
    render(<NotFoundPage />);

    const button = screen.getByText('Go to Home');
    fireEvent.click(button);

    expect(button).toBeInTheDocument();

    expect(pushMock).toHaveBeenCalledWith('/');
  });
});
