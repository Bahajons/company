import styled from 'styled-components'

export const StyledLoader = styled.div`
    margin: 0;
    padding: 0;
    width: 100%;
    .load{
        text-align: center;
        position: fixed;
        width: 100%;
        height: 100vh;
        z-index: 10000;
        background-color: rgba(0,0,0,.5);
        .loader{
            width: 50px;
            height: 50px;
            border: 5px solid #fff;
            border-right-color: transparent;
            border-left-color: transparent;
            top: 50vh;
            left: 50%;
            position: fixed;
            border-radius: 50%;
            padding: 6px 0;
            animation-name: circle_animate;
            animation-duration: 2s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
        }
    }
    
    @keyframes circle_animate {
        0% { 
     transform: rotate(0deg) ;
    }
    100% { 
     transform: rotate(360deg) ;
 }
}

`