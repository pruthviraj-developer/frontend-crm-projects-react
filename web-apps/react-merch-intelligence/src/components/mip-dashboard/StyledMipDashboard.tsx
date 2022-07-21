import styled from "@emotion/styled";

// Styld Component
const DashboardContentWrapper = styled.div`
   margin-left: 45px;
   flex-grow: 1;
`
const DashboardListWrapper = styled.div`

`

const EmptyDashboardErrorMessage = styled.div`
    height: calc(100vh - 100px);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
`;

const PaginationWrapper = styled.div`
    display: flex;
    margin-top: 20px;
    justify-content: center;
`;

const FilterWrapper = styled.div`
    background-color: #fff;
    text-align: left;
`;

const DashboardContentWrapperMain = styled.div`
    display: flex;
    padding: 50px 20px 50px 120px;
    background-color: #fff;
`

const DashboardCountList = styled.div`
    text-align: left;
    margin-left: 10px;
`
// Styld Component End

export { DashboardContentWrapper,DashboardListWrapper,EmptyDashboardErrorMessage,PaginationWrapper,FilterWrapper,DashboardContentWrapperMain,DashboardCountList }