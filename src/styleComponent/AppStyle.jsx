import styled from "styled-components";

export const AppStyle = styled.div`
  .online{
    background-color: #00d100;
    transition: .6;
    p{
      text-align: center;
      padding: 0;
      margin: 0;
      font-size: 12px;
      color: #ffffff;
    }
  }
  .offline{
    padding-top: 30vh;
    opacity: .6;
    .icon{
      font-size: 180px;
      display: block;
      margin: 0 auto;
    }
    p{
      text-align: center;
    }
  }

  .wrs_editor{

    td{
      padding:0;
    }
  }


`