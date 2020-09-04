import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#222222" : "#FFF"};
    color: ${(props) => (props.theme.mode === "dark" ? "#FFF" : "#222222")};
}`;

export default GlobalStyle;
