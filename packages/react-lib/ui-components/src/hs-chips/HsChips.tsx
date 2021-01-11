import React, { FC, useState } from 'react';
import Chip from '@material-ui/core/Chip';
// import { makeStyles } from '@material-ui/core/styles';
import { IHsChips, Ilist, FiltersOption } from './IHsChips';

// const useStyles = makeStyles({
// });

export const HsChips: FC<IHsChips> = ({objectsList}: IHsChips) => {
//   const classes = useStyles();
  const [data, setData] = useState(objectsList || []);
// const mapList = data.forEach(element => {
//     mapList.set(element.key,element.options) 
// });
  const handleDelete = (key:string,index:number) => {
    console.info('You clicked the delete icon.');
  };

  return (
    <div>
        {/* {JSON.stringify(data)} */}
        {data.map((obj:Ilist) => (
            obj.options.map(
                (listObject:FiltersOption,index:number) => 
                (<Chip label={listObject.display} onDelete={() => {handleDelete(obj.key,index);}} color="primary" />)
                )
        ))}
    </div>
  );
};
