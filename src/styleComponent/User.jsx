import styled from 'styled-components';


export const Profile_style = styled.div`
    padding-top: 1.5rem;
    h5{
        padding: 10px 0 20px 0;
    }
.avatar{
    width: 120px;
    height: 120px;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
    border: 1px solid #a1a1a1;
    img{
        z-index: 1;
    }
    .icon{
        position: absolute;
        right: 0;
        bottom: 0;
        width: 30px;
        height: 30px;
        padding: 5px;
        background-color: white;
        color: #a1a1a1;
        border-radius: 15px;
        z-index: 100;
        cursor: pointer;
    }
}
.edit{
    height: 37px;
}
.image{
    width: 120px;
    height: 120px;
    background-color: #a1a1a1;
    .person{
        font-size: 115px;
        color: #d8d8d8;
    }
}

`