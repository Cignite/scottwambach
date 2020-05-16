import styled from 'styled-components';
import { above } from '../utilities/mediaQueries';

const Form = styled.form`
  &.singleSubmit {
    ${above.ipadPort`
      display: flex;
      justify-content: space-between;
    `}

    input {
      ${above.ipadPort`
        width: calc(100% - 195px);
      `}

      &[type="submit"] {
        width: 100%;

        ${above.ipadPort`
          width: 180px;
        `}
      }
    }
  }

  .inner {
    display: flex;
    flex-wrap: wrap;

    label {
      width: 100%;
      display: block;

      &.half {
        width: 50%;
      }

      span {
        display: block;
      }
    }
  }
`;

export default Form;
