import React from "react";
import styled from "styled-components";
import { tColor, Size } from "client/types/ui"
import { StyledComponentBase } from 'styled-components';

interface Props  {
  type: string;
  height?: string;
  theme?: tColor;
  borderColor?: string;
  textSize: string;
  width?: Size;
  onChange?: (e:any) => void;
  validateInput?: (e:any) => void;
}

class InputComponent extends React.PureComponent<Props> {
  render() {
    return (
      <Input 
        onChange={this.props.onChange}
        height={this.props.height}
        type={this.props.type}
        width={this.props.width}
        textSize={this.props.textSize}
        validateInput={this.props.validateInput}
      />
    )
  }
}

const Input: StyledComponentBase<any, any> = styled("input")<Props>`
  height: ${props => props.height ? `${props.height}px` : "inherit"}
  border: 1px solid ${props => props.borderColor}
  width: ${props => props.width ? `${props.width}px`: "auto"}
  font-size: ${props => props.textSize ? `${props.textSize}px` : "12px"}
  padding: 5px;
  background-image: none !important;
  -webkit-appearance: none;
  outline: none;
}`


export default InputComponent