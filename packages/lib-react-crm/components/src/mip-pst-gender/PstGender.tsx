import React, { FC } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {
  PstGenderTable,
  PstGenderCardHeader,
  PstTitleCount,
  PstTitle,
} from './StyledPstgender';
import { PstGenderList } from './IPstGender';

export const PstGender: FC<PstGenderList> = ({
  imageUrl,
  pstGenderName,
  pstId,
  gender,
  discoveryPidCount,
  targetCurrentWidthData,
  keepCullData,
}: PstGenderList) => {
  return (
    <Card>
      <CardActionArea
        href={`/react-monorepo/merch-intelligence/pid-review/${encodeURIComponent(
          pstId
        )}/${encodeURIComponent(gender)}/${encodeURIComponent(pstGenderName)}`}
      >
        <PstGenderCardHeader>
          <PstTitle>{pstGenderName}</PstTitle>
          <PstTitleCount>{discoveryPidCount}</PstTitleCount>
        </PstGenderCardHeader>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <CardMedia
                component="img"
                alt="thumbnail"
                height="140"
                src={imageUrl}
                title="thumbnail"
              />
            </Grid>
            <Grid item xs={8}>
              <PstGenderTable>
                <TableBody>
                  {targetCurrentWidthData.map((item, index) => {
                    return (
                      <TableRow key={`targetCurrentWidthData${index}`}>
                        <TableCell
                          align="center"
                          variant="head"
                          className="title"
                        >
                          {item[0]}
                        </TableCell>
                        <TableCell colSpan={2} align="center">
                          {item[1]}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {keepCullData.map((item, index) => {
                    return (
                      <TableRow key={`keepCullData${index}`}>
                        <TableCell
                          align="center"
                          variant="head"
                          className="title"
                        >
                          {item[0]}
                        </TableCell>
                        <TableCell
                          align="center"
                          variant={index == 0 ? 'head' : 'body'}
                        >
                          {item[1]}
                        </TableCell>
                        <TableCell
                          align="center"
                          variant={index == 0 ? 'head' : 'body'}
                        >
                          {item[2]}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </PstGenderTable>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
