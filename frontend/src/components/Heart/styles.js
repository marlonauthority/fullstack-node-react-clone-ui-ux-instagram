import styled, { css, keyframes } from "styled-components";

const heartbeat = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const blowout = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

const confetti = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    transform: scale(1.1);
    opacity: 1;
  }
`;

export const Container = styled.span`
  height: 16px;
  position: relative;
  display: flex;
  align-items: center;
  /* background-color: #eaeaea; */
  padding: 6px 10px 4px 10px;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    width: 27px;
    height: 27px;
    margin-top: -1px;
    margin-left: -5px;
    border-radius: 100%;
    background: #d83535;
    display: inline-block;
    transform: scale(0);
    will-change: transform;
  }

  &:after {
    content: "";
    position: absolute;
    top: 11px;
    left: 16px;
    width: 2px;
    height: 2px;
    border-radius: 2px;
    box-shadow: 0 -18px 0 #d83535, 12px -12px 0 #d83535, 18px 0 0 #d83535,
      12px 12px 0 #d83535, 0 18px 0 #d83535, -12px 12px 0 #d83535,
      -18px 0 0 #d83535, -12px -12px 0 #d83535;
    transform: scale(0);
    will-change: transform;
  }

  svg {
    fill: #b2b2b2;
    will-change: transform;
  }

  ${props =>
    props.hearted &&
    css`
      &:before {
        animation: ${blowout} 0.6s ease-in-out;
      }

      svg {
        opacity: 0;
        fill: red;
        animation: ${heartbeat} 0.4s ease-in-out forwards;
        animation-delay: 0.3s;
      }

      &:after {
        animation: ${confetti} 0.6s ease-in-out;
        animation-delay: 0.3s;
      }
    `};
`;
