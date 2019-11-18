import React from "react";
import styled from "styled-components";
import { Size } from "client/types/ui"

interface Props {
  background?: string;
  size?: Size;
  color?: string
}

const Button = styled("button")<Props>`
  background-color: ${props => props.background ? props.background : "white"};
  width: ${props => props.size ? `${props.size}px` : "auto"};
  height: 40px;
  text-align: center;
  vertical-align: middle;
  min-width: ${props => props.size ? props.size : "30"}px;
  color: #fff;
  border: 0px;
  font-size: 1rem;
  -webkit-appearance: none;
  outline: none;
`
export default Button