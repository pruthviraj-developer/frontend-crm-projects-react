import styled from "@emotion/styled";

// Styld Component
const DashboardContentWrapper = styled.div`
    padding: 50px 20px 50px 120px;
    background-color: #fff;
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
// Styld Component End

export { DashboardContentWrapper,DashboardListWrapper,EmptyDashboardErrorMessage,PaginationWrapper }