import styled from "styled-components";

export const SECTION = styled.div `
  h3 {
    color: #4C9900;
    margin-bottom: 0;
    flex:0 0 100%;
    margin-left: 0.5em;
  }
  .tableGroup {
    display: flex;
    flex-flow: wrap;
  }
  .tableContainer {
    width: 50%;
    margin-bottom: 1em;
  }
`;
export const TABLE = styled.table`
  font-family: "Trebuchet MS", Helvetica, sans-serif;
  font-size: 1em;
  color: #606060;
  text-align: left;
  margin: 0 0.5em 0 0.5em; 
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