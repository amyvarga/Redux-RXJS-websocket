import styled from "styled-components";

export const SECTION = styled.section `
  display: flex;
  flex-flow: wrap;
  h3, h2 {
    color: #4C9900;
    margin-bottom: 0;
    flex:0 0 100%;
  }
  .tableContainer {
    width: 33%;
    margin-bottom: 1em;
  }
`;
export const TABLE = styled.table`
  font-family: "Trebuchet MS", Helvetica, sans-serif;
  font-size: 0.75em;
  color: #606060;
  text-align: left;
  width: 95%; 
  border: 1px solid #4C9900;
  tr {
    height: 1em;
    th {
      border-bottom: 1px solid #4C9900;
    }
    h4 {
      margin-bottom: 0;
      color: #404040;
    }
  }
  tbody {
    tr:nth-child(odd) {
      background-color: #DCDCDC;
    }
    tr {
      height: 2em;
    }
    td{
      padding: 0 0.25em;
    }
  }
  th:nth-child(1), td:nth-child(1) {
    width: 60%;
  }
`;

 export const TR = styled.tr`
  padding: 0;
  .dt {
    font-weight: 600;
  }
`;