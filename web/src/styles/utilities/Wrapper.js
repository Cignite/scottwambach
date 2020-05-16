import styled from 'styled-components';
import { wrap } from './layout';
import { breakpoints } from './settings';

const Wrapper = styled.div`
  ${wrap}
  ${props => props.narrow && `max-width: ${breakpoints.ipadPort}px;`}
  ${props => props.narrower && `max-width: ${breakpoints.mobile}px;`}
  ${props => props.full && 'max-width: none; padding: 0;'}
`;

export default Wrapper;
