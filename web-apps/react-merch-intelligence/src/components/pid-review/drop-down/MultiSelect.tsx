import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { useStyles } from './StyledDropDown';

interface IMultiSelect {
  mskuList: any;
  selectedMskuList?: any;
  updateFilter: (e: string) => void;
}

export const MultiSelect = ({ mskuList = [], selectedMskuList = [], updateFilter }: IMultiSelect) => {
  const classes = useStyles();

  const handleChange = (event: any) => {
    const value = event.target.value;
    updateFilter(value.toString());
  };

  return (
    <FormControl className={classes.formControl}>
      <Select
        labelId="mutiple-select-label"
        multiple
        displayEmpty
        value={selectedMskuList}
        onChange={handleChange}
        renderValue={(selectedMskuList: any) => {
          if (selectedMskuList.length === 0) {
            return <em>SELECT MSKU</em>;
          }
          return selectedMskuList.join(', ');
        }}
        variant="outlined"
        classes={{ root: classes.select }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 50 * 4.5 + 8,
              width: 250,
            },
          },
          getContentAnchorEl: null,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          variant: 'menu',
        }}
      >
        {mskuList.map((option: any) => (
          <MenuItem key={option.id} value={option.id} className={classes.list}>
            <Checkbox checked={option.isSelected} color="primary" />
            <ListItemText primary={option.name} className={classes.itemValue} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
