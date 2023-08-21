import React, { useEffect, useState } from 'react';
import MipMskuTableProps from './IMipMskuTable';
import {
  AccordionIcon,
  AccordionToggleIcon,
  TableWrapper,
  ViewMoreButton,
  ViewMoreWrapper,
  TableContentWrapper,
} from './StyledMipMskuTable';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { IconAngleDown } from '@hs/icons';

export const MipMskuTable: React.FC<MipMskuTableProps> = ({
  tableData,
  accordian = false,
  accordianCount = 0,
}: MipMskuTableProps) => {
  const [isAccordianOpen, setAccordianOpen] = useState(false);
  const [accordianBtnText, setAccordianBtnText] = useState('');

  function toggleAccordian($event) {
    $event.stopPropagation();
    const accordianBtnTextState = isAccordianOpen
      ? `${accordianCount} More`
      : 'Less';

    setAccordianBtnText(accordianBtnTextState);
    setAccordianOpen((accordianFlagState) => {
      return !accordianFlagState;
    });
  }

  useEffect(() => {
    setAccordianBtnText(
      accordian && accordianCount > 0
        ? !isAccordianOpen
          ? `${accordianCount} More`
          : `Less`
        : ''
    );
  }, [accordian]);

  return (
    <TableContentWrapper>
      <TableWrapper hasAccordian={accordian} accordianOpen={isAccordianOpen}>
        <Table>
          <TableBody>
            {tableData.map((item, index) => {
              // let variant:TableCellProps["variant"] = index == 0 ? "head" : "body";
              return (
                <TableRow key={`table${index}`}>
                  {item.map((colItem, colIndex) => {
                    return (
                      <TableCell
                        key={`tableCell${colIndex}`}
                        variant={index == 0 ? 'head' : 'body'}
                      >
                        {colItem}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableWrapper>
      {accordian && accordianCount != 0 && accordianCount < tableData.length && (
        <ViewMoreWrapper>
          <ViewMoreButton onClick={(event) => toggleAccordian(event)}>
            {accordianBtnText}
            <AccordionToggleIcon active={isAccordianOpen ? true : false}>
              <AccordionIcon icon={IconAngleDown} />
            </AccordionToggleIcon>
          </ViewMoreButton>
        </ViewMoreWrapper>
      )}
    </TableContentWrapper>
  );
};
