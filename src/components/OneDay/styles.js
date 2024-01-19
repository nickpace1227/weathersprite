import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  .forecast-card {
    display: flex;
    flex-direction: column;
    border: solid 5px black;
    border-radius: 10px;
    padding: 20px;
    margin-top: 50px;
    background-color: grey;
  }

  .forecast-header {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    text-decoration: underline;
  }

  .forecast-value {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px;
  }

  .blank-search {
    text-align: center;
    padding: 20px;
    margin: 20px;
    border-radius: 15px;
    background-color: grey;
  }
`;
