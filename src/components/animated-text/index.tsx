import { EColors } from '@/themes';
import { CSSProperties, FC } from 'react';
import { styled } from 'styled-components';

interface IAnimtedText extends IStyledWord, IStyledLetter {
  text: string;
}

const AnimatedText: FC<IAnimtedText> = ({
  text,
  $colorOnJump,
  ...wordStyle
}) => {
  const words = text.split(' ');

  return words.map((word, wordIndex) => (
    <StyledWord key={wordIndex} {...wordStyle}>
      {word.split('').map((char, charIndex) => (
        <StyledLetter
          $colorOnJump={$colorOnJump}
          key={`${wordIndex}-${charIndex}`}
        >
          {char}
        </StyledLetter>
      ))}
    </StyledWord>
  ));
};

export default AnimatedText;

interface IStyledWord {
  $fontWeight?: CSSProperties['fontWeight'];
  $fontSize?: CSSProperties['fontSize'];
  $marginRight?: CSSProperties['marginRight'];
}

interface IStyledLetter {
  $colorOnJump?: CSSProperties['color'];
  $jumpHeight?: `${string}px`;
}

const StyledWord = styled.span<IStyledWord>`
  display: inline-block;
  margin-right: ${({ $marginRight }) => $marginRight || '0.5rem'};
  font-size: ${({ $fontSize }) => $fontSize || '3rem'};
  font-weight: ${({ $fontWeight }) => $fontWeight || 700};
`;

const StyledLetter = styled.span<IStyledLetter>`
  display: inline-block;
  transition: transform 0.3s ease;
  cursor: default;

  @keyframes jump {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-5px);
    }

    100% {
      transform: translateY(0);
    }
  }

  &:hover {
    animation: jump 0.4s ease;
    color: ${({ $colorOnJump }) => $colorOnJump || EColors.GREEN_500};
  }
`;
