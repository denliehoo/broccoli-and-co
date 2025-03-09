import { MIN_WIDTH, MOBILE_BREAK_POINT } from '@/themes';
import { EColors } from '@/themes';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
  children: ReactNode;
}

const Modal: FC<IModalProps> = ({
  isOpen,
  onClose,
  closeOnOverlayClick,
  children,
}) => {
  if (!isOpen) {
    return null;
  }

  const onClickOverlay = closeOnOverlayClick ? onClose : undefined;

  return (
    <StyledOverlay onClick={onClickOverlay} data-testid="modal-overlay">
      <StyledContainer onClick={(e) => e.stopPropagation()}>
        <StyledClosedButton onClick={onClose}>×</StyledClosedButton>
        {children}
      </StyledContainer>
    </StyledOverlay>
  );
};

export default Modal;

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  min-width: ${MIN_WIDTH};
`;

const StyledContainer = styled.div`
  background-color: ${EColors.GREEN_200};
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  position: relative;

  @media (max-width: ${MOBILE_BREAK_POINT}) and (min-width: ${MIN_WIDTH}) {
    max-width: ${MIN_WIDTH};
  }
`;

const StyledClosedButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;
