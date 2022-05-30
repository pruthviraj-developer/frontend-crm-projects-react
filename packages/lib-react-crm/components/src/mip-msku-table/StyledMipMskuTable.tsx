import styled from '@emotion/styled';
import { Colors } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const TableContentWrapper = styled.div`
    
`

const TableWrapper = styled.div<{accordianOpen:boolean, hasAccordian: boolean}>`
    transition: max-height 1s linear;
    max-height: ${(props) => (!props.accordianOpen && props.hasAccordian ? '105px' : 'none')};
    overflow: hidden;

    table{
        border: 1px solid ${Colors.GREY_TINT[500]};
        background: ${Colors.WHITE};
    }
    td,
    th {
        border: 1px solid ${Colors.GREY_TINT[500]};
        font-size: 16px;
    }
    td.MuiTableCell-head{
        font-weight: 700;
    }
    .MuiAccordionDetails-root{
        padding: 0;
    }`;


const TbodyWrapper = styled.tbody`
    
`;

const ViewMoreWrapper = styled.div`
    text-align: left;
`;

const ViewMoreButton = styled.span`
    color: #ED54A4;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
`;

const AccordionIcon = styled(SvgIcon)``;

const AccordionToggleIcon = styled.span<{ active: boolean }>`
  display: inline-block;
  transform: scaleY(${(props) => (props.active ? -1 : 1)});
`;

export {TbodyWrapper,TableWrapper,ViewMoreWrapper, ViewMoreButton, AccordionIcon, AccordionToggleIcon,TableContentWrapper};