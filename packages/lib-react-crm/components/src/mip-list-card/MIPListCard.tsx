import React from "react";
import { Link } from "react-router-dom";
import { MipMskuTable } from "..";
import MIPListCardProps from "./IMIPListCard";
import { DashboardCardWrapper, DashboardImage, DashboardImageWrapper, FlagWrapper, MipMskuTableWrapper, NameTemplateWrapper, NameWrapper, ReviewButton, ReviewButtonWrapper } from "./StyledMIPListCard";



export const MipListCard : React.FC<MIPListCardProps> = ({imageUrl,mskuName,assotmentFlag,mskuData,reviewUrl})=>{
    return(
        <DashboardCardWrapper>
            <DashboardImageWrapper>
                <DashboardImage src={imageUrl}></DashboardImage>
                <ReviewButtonWrapper>
                    <Link to={reviewUrl}>
                        <ReviewButton variant='contained'>Review</ReviewButton>
                    </Link>
                    
                </ReviewButtonWrapper>
            </DashboardImageWrapper>
            <NameTemplateWrapper>
                <FlagWrapper flagColor={assotmentFlag}>
                    <NameWrapper>{mskuName}</NameWrapper>
                </FlagWrapper>
                
                <MipMskuTableWrapper>
                    <MipMskuTable tableData={mskuData}></MipMskuTable>
                </MipMskuTableWrapper>
                
            </NameTemplateWrapper>
        </DashboardCardWrapper>
    )
}
