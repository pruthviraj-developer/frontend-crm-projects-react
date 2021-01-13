import React, { FC, useState } from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { IHsChips, Ilist, FiltersOption } from './IHsChips';

const useStyles = makeStyles({
  chips : {
    margin:'5px'
  }
});

// export const HsChips: FC<IHsChips> = ({objectsList}: IHsChips) => {
//   const classes = useStyles();
//   console.log('Obj List', objectsList);
//   const [data, setData] = useState(objectsList || []);
//   const handleDelete = (arrayindex:number, index:number) => {
//     const obj  = {...data[arrayindex]};
//     obj.options.splice(index,1);
//     data.splice(arrayindex,1);
//     setData([ ...data,obj]);
//   };

//   return (
//     <div>
//       {/* {JSON.stringify(objectsList)} */}
//         {data.map((obj:Ilist, arrayindex) => (
//             obj.options.map(
//               (listObject:FiltersOption,index:number) => 
//               (<Chip key={listObject.key || index} label={listObject.display} onDelete={() => {handleDelete(arrayindex, index);}} color="primary"  className={classes.chips}/>))
//         ))}
//     </div>
//   );
// };

export const HsChips: FC<IHsChips> = ({objectsList,updateRemovedFilters}: IHsChips) => {
  let list = [...objectsList];
  const classes = useStyles();
  const [data, setData] = useState(list || []);
  const handleDelete = (arrayindex:number, index:number) => {
    const obj  = {...list[arrayindex]};
    obj.options.splice(index,1);
    list.splice(arrayindex,1);
    list = [ ...list,obj];
    setData(list);
    updateRemovedFilters && updateRemovedFilters(list);
  };

  return (
    <div>
        {list.map((obj:Ilist, arrayindex) => (
            obj.options.map(
              (listObject:FiltersOption,index:number) => 
              (<Chip key={listObject.key || index} label={listObject.display} onDelete={() => {handleDelete(arrayindex, index);}} color="primary"  className={classes.chips}/>))
        ))}
    </div>
  );
};
