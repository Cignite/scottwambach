import styled, { css } from 'styled-components';
import { colors } from '../utilities/settings';
import { button } from '../utilities/elements';

export const inputStyles = css`
  appearance: none;
  box-shadow: none;
  border: 1px solid ${colors.black};
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
  width: 100%;
  display: block;
`;

export const Input = styled.input`
  ${inputStyles};
  &[name='hpFirst'] {
    display: none;
  }
`;

export const Textarea = styled.textarea`
  ${inputStyles};
  min-height: 100px;
`;

export const Submit = styled.input`
  ${button};
`;

export const Fieldset = styled.fieldset`
  margin-right: -20px;
  label {
    padding: 0 20px 20px 0;
  }
`;
