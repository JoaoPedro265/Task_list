import { createGlobalStyle } from "styled-components";

const MyGlobalStyle = createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}
body{
    background-color:wheat;
}
p{
    font-size:20px;
}
`
export default MyGlobalStyle