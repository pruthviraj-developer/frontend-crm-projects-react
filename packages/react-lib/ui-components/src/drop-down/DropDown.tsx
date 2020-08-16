import React, { FC } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { DropDownProps } from './IDropDown';
import { useState, useRef, useEffect } from 'react';
import { Colors } from '@hs/utils';
import {
  SelectedCircle,
  DeSelectedCircle,
  SvgIcon,
  SelectedRectAngle,
  DeSelectedRectAngle,
} from '@hs/icons';

const DropDownElement = styled.div`
  cursor: pointer;
  /* width: inherit; */
  position: relative;
`;
const CustomSizePicker = styled.div<{ isActive: boolean; menuWidth?: number }>`
  border: 1px solid ${Colors.MERCURY};
  border-radius: 4px;
  background-color: ${Colors.WHITE};
  width: ${(props) => props.menuWidth}px;
  border-color: ${(props) => (props.isActive ? Colors.DARKGRAY : 'inherit')};
`;

const selectPreviewStyles = ({ isActive }: { isActive: boolean }) => css`
  ${isActive === true && `border-bottom: 1px solid ${Colors.DARKGRAY}`}
`;

const SelectPreview = styled.div`
  font-size: 14px;
  line-height: 16px;
  margin: 0;
  padding: 16px;
  display: block;
  color: ${Colors.GRAY20};
  background-position: 100%;
  background-origin: content-box;
  background-repeat: no-repeat;
  ${selectPreviewStyles}
`;

const SelectedElement = styled.div``;

const PlaceHolder = styled.div`
  color: ${Colors.DARKGRAY};
`;

const OptionPreview = styled.div`
  display: block;
  width: 100%;
  max-height: 250px;
  overflow-y: scroll;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.16);
  position: absolute;
  z-index: 1000;
  background-color: ${Colors.WHITE};
`;

const OptionSelected = ({ isSelected }: { isSelected: boolean }) => css`
  ${isSelected === true && `background-color: ${Colors.GRAY};`}
`;

const Option = styled.div`
  color: ${Colors.GRAY20};
  padding: 16px;
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  border-bottom: 1px solid ${Colors.MERCURY};
  display: flex;
  justify-content: space-between;
  ${OptionSelected}
`;

const StyledIcon = styled(SvgIcon)`
  min-width: 24px;
`;

const SpanElement = styled.span``;

const DropDown: FC<DropDownProps> = (props: DropDownProps) => {
  const options = props.options || [];
  const objName = props['objName'] || '';
  const objKey = props['objKey'] || '';
  const [isActive, setIsActive] = useState(false);
  const [selectedElement, setSelectedElement] = useState(props.selectedObject);
  const [selectedElements, setSelectedElements] = useState(
    props.selectedObjects || []
  );
  const activeStatus = { isActive: isActive || false };
  const ref = useRef<HTMLDivElement>(null);
  const handleClick = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsActive(false);
      if (props.isMultiselect && props.onMultiSelect && selectedElements) {
        props.onMultiSelect(selectedElements);
      }
    }
  };
  const onSelect = (obj: Record<string, unknown>) => {
    setSelectedElement(obj);
    if (props.onSingleSelect) {
      props.onSingleSelect(obj);
    }
    setIsActive(false);
  };

  const onMultiSelect = (obj: Record<string, unknown>) => {
    const currentData = selectedElements || [];
    const index = currentData.findIndex((ele) => {
      return ele[objKey] === obj[objKey];
    });
    if (index > -1) {
      currentData.splice(index, 1);
    } else {
      currentData.push(obj);
    }
    setSelectedElements([...currentData]);
  };
  const updateSelectedValue = () => {
    let value;
    if (props.isMultiselect) {
      const list: Array<string> = [];
      const elements = selectedElements || [];
      elements.forEach((element: Record<string, unknown>) => {
        const obj = element[objName];
        if (obj) {
          list.push(obj as string);
        }
      });
      value = list.join(',');
    } else {
      if (typeof selectedElement === 'string') {
        value = selectedElement;
      } else if (selectedElement && selectedElement[objName]) {
        value = selectedElement[objName];
      }
    }
    return value;
  };
  const selectedValue = updateSelectedValue();
  const checkIfSelected = (obj: Record<string, unknown>) => {
    const getValue = (sObj: Record<string, unknown>, state: string) => {
      return sObj && sObj[state] ? sObj[state] : null;
    };
    const selectedElementValue = getValue(
      selectedElement as Record<string, unknown>,
      objKey
    );
    const selectedElementPropsValue = getValue(
      props.selectedObject as Record<string, unknown>,
      objKey
    );
    if (typeof obj === 'string') {
      if (selectedElement) {
        return obj === selectedElement;
      }
      return obj === props.selectedObject;
    } else if (selectedElementValue) {
      return obj[objKey] === selectedElementValue;
    }
    return obj[objKey] === selectedElementPropsValue;
  };
  const checkIfMultiSelected = (obj: Record<string, unknown>) => {
    if (selectedElements && selectedElements.length) {
      const found = selectedElements.find((ele) => {
        return ele[objKey] === obj[objKey];
      });
      return found ? true : false;
    }
    return false;
  };
  const getOptions = () => {
    const list: Array<any> = [];
    const isMultiselect = props.isMultiselect || false;
    const iconsObject = isMultiselect
      ? {
          selected: SelectedRectAngle,
          deselected: DeSelectedRectAngle,
        }
      : {
          selected: SelectedCircle,
          deselected: DeSelectedCircle,
        };
    options.forEach((obj, index) => {
      const isSelected = isMultiselect
        ? checkIfMultiSelected(obj)
        : checkIfSelected(obj);
      list.push(
        <Option
          isSelected={isSelected}
          onClick={() => (isMultiselect ? onMultiSelect(obj) : onSelect(obj))}
          key={index}
        >
          <SpanElement>{obj[objName] || obj}</SpanElement>
          <StyledIcon
            icon={isSelected ? iconsObject.selected : iconsObject.deselected}
          />
        </Option>
      );
    });
    return list;
  };
  useEffect(() => {
    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  });
  return (
    <DropDownElement ref={ref}>
      <CustomSizePicker isActive={isActive} menuWidth={props.menuWidth}>
        <SelectPreview onClick={() => setIsActive(!isActive)} {...activeStatus}>
          {selectedValue ? (
            <SelectedElement>{selectedValue}</SelectedElement>
          ) : (
            <PlaceHolder>{props.placeholder}</PlaceHolder>
          )}
        </SelectPreview>
        {isActive && <OptionPreview>{getOptions()}</OptionPreview>}
      </CustomSizePicker>
    </DropDownElement>
  );
};

export default DropDown;
