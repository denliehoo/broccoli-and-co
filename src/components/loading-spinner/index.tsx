import { EColors } from '@/themes';
import { styled } from 'styled-components';

const LoadingSpinner = styled.div`
  border: 4px solid ${EColors.WHITE};
  border-top: 4px solid ${EColors.PRIMARY};
  border-radius: 50%;
  width: 0.75rem;
  height: 0.75rem;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default LoadingSpinner;
