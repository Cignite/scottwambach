import styled from 'styled-components';
import { colors } from '../utilities/settings';

const Table = styled.table`
  width: 100%;
  border-top: 1px solid ${colors.gray};
  border-bottom: 1px solid ${colors.gray};

  tr {
    &:nth-child(2n) {
      background-color: ${colors.gray};

      th,
      td {
        border-color: ${colors.white};
      }
    }
  }

  th,
  td {
    padding: 5px 10px;
    border-right: 1px solid ${colors.gray};
    border-left: 1px solid ${colors.gray};
  }
`;

export default Table;
