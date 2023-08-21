import styled from '@emotion/styled';
import { Colors, primaryColor, secondaryColor, typography } from '@hs/utils';
import { SvgIcon } from '@hs/icons';
const FiltersWrapper = styled.div`
  min-width: 238px;
  //max-width: 238px;
  font-size: 1.4rem;
  height: fit-content;
  background-color: ${Colors.WHITE};
  border: 1px solid ${Colors.MERCURY};
  line-height: ${typography.size.s3}px;
  font-weight: ${typography.weight.regular};
`;

const FiltersHeader = styled.div`
  padding: 20px 24px;
  border-radius: 4px 4px 0 0;
  background-color: ${Colors.WHITE};
  border-bottom: 1px solid ${Colors.MERCURY};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.span`
  color: ${secondaryColor[300]};
  font-size: 1.6rem;
  line-height: ${typography.size.s24}px;
  font-weight: ${typography.weight.medium};
`;

const ClearAll = styled.span`
  cursor: pointer;
  padding-top: 5px;
  color: ${Colors.DARKGRAY};
  font-weight: ${typography.weight.medium};
  &:hover {
    color: ${primaryColor[100]};
  }
`;

const ToggleIcon = styled(SvgIcon)<{ active?: boolean }>`
  display: ${(props) => (props.active ? 'block' : 'none')};
  transform: ${(props) => (props.active ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s;
`;

const FilterListTitle = styled.div`
  cursor: pointer;
  padding: 13px 24px;
  position: relative;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${secondaryColor[300]};
  font-weight: ${typography.weight.medium};
  &:hover .toggleIcon {
    display: block;
  }
`;

const FilterName = styled.span``;

const FilterList = styled.div<{ active?: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${secondaryColor[300]};
  font-weight: ${typography.weight.medium};
  background-color: ${(props) =>
    props.active ? primaryColor[50] : Colors.WHITE};
`;

const CheckBoxWrapper = styled.label`
  width: 100%;
  cursor: pointer;
  padding: 8px 24px;
  float: left;
  display: flex;
`;

const CheckBox = styled.input`
  display: none;
`;

const CheckBoxLabelText = styled.span<{ active?: boolean }>`
  margin: 0;
  max-width: 60%;
  cursor: pointer;
  overflow: hidden;
  line-height: 16px;
  font-size: 1.4rem;
  white-space: nowrap;
  display: inline-block;
  text-overflow: ellipsis;
  color: ${Colors.GRAY20};
  font-weight: ${(props) =>
    props.active ? typography.weight.medium : typography.weight.regular};
`;

const CheckBoxIcon = styled.span`
  top: -1px;
  width: 14px;
  height: 14px;
  cursor: pointer;
  border-radius: 3px;
  margin-right: 10px;
  position: relative;
  display: inline-block;
  border: 1px solid ${Colors.DARKGRAY};
`;

const CheckBoxIconChecked = styled(SvgIcon)`
  top: -1px;
  width: 14px;
  height: 14px;
  padding: 2px;
  border-radius: 3px;
  margin-right: 10px;
  position: relative;
  display: inline-block;
  border: 1px solid ${primaryColor[100]};
  background-color: ${primaryColor[100]};
`;

const RadioButton = styled.span`
  top: -1px;
  width: 14px;
  height: 14px;
  padding: 0px;
  border-radius: 50%;
  margin-right: 10px;
  position: relative;
  display: inline-block;
  border: 1px solid ${Colors.DARKGRAY};
`;

const RadioButtonChecked = styled(SvgIcon)`
  top: -1px;
  width: 14px;
  height: 14px;
  padding: 2px;
  border-radius: 50%;
  margin-right: 10px;
  position: relative;
  display: inline-block;
  border: 1px solid ${primaryColor[100]};
  background-color: ${primaryColor[100]};
`;

const PstGenderWrapper = styled.div`
  padding: 10px 16px;
`;

const RangeSliderWrapper = styled.div`
  padding: 0 25px 13px 25px;
  margin-top: 15px;
`;

const ColorLabel = styled.label<{ bgcolor: string }>`
  padding: 0;
  width: 40px;
  height: 24px;
  cursor: pointer;
  margin: 0 8px 8px 0;
  display: inline-block;
  box-sizing: border-box;
  border: 1px solid ${Colors.MERCURY};
  background-color: ${(props) =>
    props.bgcolor ? props.bgcolor : Colors.WHITE};
`;

const ColorChecked = styled(SvgIcon)<{ bgcolor: string }>`
  width: 40px;
  height: 24px;
  padding: 3px;
  cursor: pointer;
  margin: 0 8px 8px 0;
  display: inline-block;
  box-sizing: border-box;
  border: 1px solid ${Colors.MERCURY};
  background-color: ${(props) =>
    props.bgcolor ? props.bgcolor : Colors.WHITE};
`;

const FilterSelected = styled.span`
  top: 18px;
  left: 10px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  position: absolute;
  background-color: ${primaryColor[100]};
`;

const Wrapper = styled.div``;

const Category = styled.div`
  cursor: pointer;
  padding: 8px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  &:hover .toggleIcon {
    right: 8px;
    display: block;
    position: absolute;
  }
`;

const CategoryName = styled.span`
  display: block;
  color: ${Colors.GRAY20};
  font-weight: ${typography.weight.regular};
  font-size: 1.4rem;
  line-height: 16px;
  position: relative;
  white-space: nowrap;
  cursor: pointer;
`;

const FilterSection = styled.div`
  border-bottom: 1px solid ${Colors.MERCURY};
`;

const SubCategories = styled.div`
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 16px;
  font-weight: ${typography.weight.medium};
  padding: 9px 24px;
  position: relative;
`;

const AllCategories = styled.span`
  font-size: 1.4rem;
  line-height: 16px;
  color: ${Colors.GRAY20};
  font-weight: ${typography.weight.regular};
`;

const SubCategoryName = styled.span`
  display: block;
  cursor: pointer;
  margin-left: 8px;
  padding: 8px 24px;
  font-size: 1.4rem;
  line-height: 16px;
  white-space: nowrap;
  color: ${Colors.GRAY20};
  font-weight: ${typography.weight.medium};
`;

const BackToCategories = styled(SvgIcon)`
  top: 5px;
  left: 4px;
  position: absolute;
  transform: rotate(180deg);
`;

const CategoriesList = styled.div`
  margin-left: 16px;
`;

const SubCategoryNameList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  .subCategory {
    font-weight: ${typography.weight.regular};
  }
  &:hover .toggleIcon {
    display: block;
    margin: 2px 5px 0 0;
  }
`;

const SubCategoryFiltersList = styled.div<{ active?: boolean }>`
  margin-left: 8px;
  padding: 8px 24px;
  font-size: 1.4rem;
  line-height: 16px;
  color: ${Colors.GRAY20};
  font-weight: ${typography.weight.medium};
  background-color: ${(props) =>
    props.active ? primaryColor[50] : Colors.WHITE};
`;

const ColorList = styled.div`
  display: inline-block;
`;

const PstGenderList = styled.div<{ active?: boolean }>`
  display: inline-block;
  border: ${(props) =>
    props.active ? 'solid 1px #ed54a5' : '1px solid #dfe1e6'};
  border-radius: 20px;
  font-size: 14px;
  background-color: #f2f2f2;
  color: ${(props) => (props.active ? '#ed54a4' : '#707070')};
  padding: 10px;
  cursor: pointer;
  line-height: 1.14;
  margin: 4px;
`;

export {
  Title,
  CheckBox,
  ClearAll,
  ToggleIcon,
  FilterList,
  ColorList,
  ColorLabel,
  ColorChecked,
  CheckBoxIcon,
  CheckBoxWrapper,
  CheckBoxLabelText,
  FilterName,
  FiltersHeader,
  FilterSelected,
  FiltersWrapper,
  FilterSection,
  FilterListTitle,
  RadioButton,
  RadioButtonChecked,
  CheckBoxIconChecked,
  Wrapper,
  Category,
  CategoryName,
  AllCategories,
  SubCategories,
  SubCategoryName,
  BackToCategories,
  CategoriesList,
  SubCategoryNameList,
  SubCategoryFiltersList,
  PstGenderList,
  PstGenderWrapper,
  RangeSliderWrapper,
};
