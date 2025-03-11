import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';

const useCloseModalActions = (isOpen: boolean, onClose: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleBackButton = () => {
      if (isMobile) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);

      // Allows user to close the modal by clicking the back button on their mobile
      if (isMobile) {
        window.addEventListener('popstate', handleBackButton);
        window.history.pushState({ modalOpen: true }, '');
      }
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      if (isMobile) {
        window.removeEventListener('popstate', handleBackButton);
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (isMobile) {
        window.removeEventListener('popstate', handleBackButton);
      }
    };
  }, [isOpen, onClose]);
};

export default useCloseModalActions;
