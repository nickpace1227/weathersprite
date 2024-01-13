import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  .valid-input {
    border-radius: 10px;
    padding: 5px;
  }

  .invalid-input {
    border-radius: 10px;
    border: 2px red solid;
    padding: 5px;
  }
`;
