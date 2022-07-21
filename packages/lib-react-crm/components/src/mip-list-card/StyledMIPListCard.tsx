import styled from "@emotion/styled";
import { Colors } from '@hs/utils';
import { Button } from "@material-ui/core";


const DashboardCardWrapper = styled.div`
    display: flex;
    background-color: ${Colors.WHITE};
    padding: 20px 10px;
    border-bottom: 2px solid #b6c1cc;
`;

const DashboardImageWrapper = styled.div`
    margin-right: 35px;
    width: 175px;
}
`;

const DashboardImage = styled.img`
    max-width: 170px;
    border: 5px solid ${Colors.WHITE};
    border-radius: 5px;
    box-shadow: 4px 4px 10px #ccc;
`;

const ReviewButtonWrapper = styled.div`
    margin-top: 15px;
    text-align: center;
    a{
        text-decoration: none;
    }
`;

const ReviewButton = styled(Button)`
    background-color: #197867 !important;
    color: ${Colors.WHITE} !important;
    font-size: 13px !important;
    font-weight: bolder;
    padding: 10px 35px;
`;

const NameTemplateWrapper = styled.div`
    
`;
const FlagWrapper = styled.div<{
    flagColor: string
}>`
   background-color : ${(props)=>{
       return(props.flagColor.toLowerCase() == "red" ? '#d64259' : '#00af9f'); 
   }};
   color: ${(props)=>{
       return(props.flagColor.toLowerCase() == "red" ? '#fff' : '#000'); 
   }};
   padding: 10px 10px 10px 10px;
   border-radius: 3px;
   margin-bottom: 20px;
   width: 650px;
   text-align: left;
   font-size: 16px;
   font-weight: 600;
`;

const NameWrapper = styled.div`
    
`;

const MipMskuTableWrapper = styled.div`
    max-width: 400px;
`
export { DashboardCardWrapper,DashboardImageWrapper,DashboardImage,NameTemplateWrapper,FlagWrapper,NameWrapper,ReviewButtonWrapper,ReviewButton,MipMskuTableWrapper };
