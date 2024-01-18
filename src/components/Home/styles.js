import styled from "styled-components";

export const Wrapper = styled.div`
  @media (max-width: 1200px) {
    .forecast-search {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .valid-input {
      border-radius: 10px;
      padding: 5px;
      margin: 3px;
    }

    .invalid-input {
      border-radius: 10px;
      border: 2px red solid;
      padding: 5px;
    }
  }

  @media (min-width: 1200px) {
    .forecast-page {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .valid-input {
      border-radius: 10px;
      padding: 5px;
      margin: 3px;
    }

    .invalid-input {
      border-radius: 10px;
      border: 2px red solid;
      padding: 5px;
    }
  }
`;
