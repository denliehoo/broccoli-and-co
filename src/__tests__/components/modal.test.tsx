import { render, screen, fireEvent } from '@testing-library/react';
import Modal, { IModalProps } from '@/components/modal';

const renderModal = (props: Partial<IModalProps> = {}) => {
  const defaultProps: IModalProps = {
    isOpen: true,
    onClose: jest.fn(),
    children: <div>Modal Content</div>,
    closeOnOverlayClick: false,
  };
  return render(<Modal {...defaultProps} {...props} />);
};

// Setup function to handle common setup logic for each test
const setup = (props: Partial<IModalProps> = {}) => {
  const onClose = jest.fn();
  renderModal({ ...props, onClose });
  return { onClose };
};

describe('Modal', () => {
  it('show the modal when isOpen is true', () => {
    setup({ isOpen: true });

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not show the modal when isOpen is false', () => {
    setup({ isOpen: false });

    // Check if modal content is not rendered
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('calls onClose when the overlay is clicked and set to close only click overlay', () => {
    const { onClose } = setup({ isOpen: true, closeOnOverlayClick: true });

    // Simulate click on the overlay
    fireEvent.click(screen.getByTestId('modal-overlay'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the close button is clicked', () => {
    const { onClose } = setup({ isOpen: true });

    // Simulate click on the close button
    fireEvent.click(screen.getByRole('button', { name: /×/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
