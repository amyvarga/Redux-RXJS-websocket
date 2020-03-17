import styled from "styled-components";

const UL = styled.ul`
  display: flex;
  flex-flow: wrap;

  li {
    list-style: none;
    width: 15em;
    height: 10em;
    border: 1px solid silver;
    position: relative;
    margin: 0.1em;
    padding: 0.5em;
  }
`;

export default UL;