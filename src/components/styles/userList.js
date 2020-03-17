import styled from "styled-components";

const UL = styled.ul`
  display: flex;
  flex-flow: wrap;
  
  li {
    list-style: none;
    width: 5em;
    height: 5em;
    border: 1px solid silver;
    position: relative;
    margin: 0.1em;
    background-color: silver;
  }
  
  img {
    width: 100%;
    height: auto;
    position: relative;
  }
  span {
    background-color: silver;
    width: auto;
    font-family: serif;
    font-size: 10px;
    color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;

  }
`;

export default UL;