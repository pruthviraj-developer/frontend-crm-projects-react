import styled from '@emotion/styled';
import { Button } from "@material-ui/core";
// Styled Component wrapper
const DashboardContentWrapper = styled.div`
    margin-left: 100px;
    padding: 25px;
    display: flex;
`;

const DashboardListingWrapper = styled.div`
    margin-left: 10px;
    /* max-width: 1024px; */
`;

const FilterWrapper = styled.div`
    background-color: #fff;
    text-align: left;
`;

const ProductListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 1100px;
    /* justify-content: space-between; */
`;

const TableSectionWrapper = styled.div`
    /* max-width: 400px; */
    width: 100%;
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    >div:first-child{
        margin-right: 50px;
    }
`;

const TotalCountWrapper = styled.div`
    width: 100%;
    text-align: left;
    margin-bottom: 15px;
`;
const ViewMoreBtn = styled(Button)`
    margin-top: 20px;
    background-color: #f00;
    color: #fff;
    font-size: 15px;
`;

const EmptyDashboardErrorMessage = styled.div`
    height: calc(100vh - 100px);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
`;

const MskuListingNameWrapper = styled.div`
    color: #ED54A4;
    font-weight: bold;
    margin-bottom: 15px;
    text-align: left;
`

export { DashboardContentWrapper, MskuListingNameWrapper, EmptyDashboardErrorMessage, ViewMoreBtn, TotalCountWrapper,TableSectionWrapper,ProductListWrapper,FilterWrapper,DashboardListingWrapper}
//styled Component Wrapper end