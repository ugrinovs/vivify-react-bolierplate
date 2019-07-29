import styled from 'styled-components';

export default styled.button`
  padding: 10px 15px;
  border-radius: 6px;
  border: none;
  color: #fff;
  background-color: #282c34;
  box-shadow: 0 0 0 2px #fff inset, 0 0 0 2px #282c34;
  cursor: pointer;
  transition: all 150ms ease-in;

  &:hover {
    background-color: #fff;
    box-shadow: 0 0 0 2px #282c34 inset, 0 0 0 2px #fff;
    color: #282c34;
  }
`;
