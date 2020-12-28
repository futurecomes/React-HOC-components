import { keyframes } from 'react-emotion';

export const bounceAnimation = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: none;
  }
`;

export const bounceInAnimation = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const slideInVertical = keyframes`
    0% {
        transform: translateY(50px);
        opacity: 0;
    }
     100% {
        transform: none;
        opacity: 1;
    }
`;

export const slideInVerticalNegative = keyframes`
    0% {
        transform: translateY(-50px);
        opacity: 0;
    }
     100% {
        transform: none;
        opacity: 1;
    }
`;

export const bounceInAnimationY = keyframes`
  0% {
    transform: translateY(-10%);
  }
  100% {
    transform: translateY(0%);
  }
`;

export const bounceOutAnimationY = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-10%);
  }
`;
