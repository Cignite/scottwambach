import React from 'react';
import Wrapper from '../../styles/utilities/Wrapper';
import Table from '../../styles/modules/Table';

const DataTable = ({
  content: {
    Table: { rows },
  },
}) => (
  <Wrapper narrow>
    <Table>
      <tbody>
        {rows.map(({ _key, cells }) => (
          <tr key={_key}>
            {cells.map((cell, index) => (
              <td key={_key + index}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  </Wrapper>
);

export default DataTable;
