import React, { FC } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import styled from '@emotion/styled';
import { ErrorPanelProps } from './IErrorPanel';

const StyledErrorPanel = styled(Paper)`
  width: '100%';
`;
const StyledHeader = styled.div`
  text-align: center;
  font-size: 2rem;
  color: red;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: '50%',
    },
    inline: {
      display: 'inline',
    },
  })
);

export const ErrorPanel: FC<ErrorPanelProps> = (props: ErrorPanelProps) => {
  const classes = useStyles();
  const header = props.header || 'Errors';
  const errorMessage: Array<string> = props.messages || [];

  return (
    <StyledErrorPanel>
      <>
        <StyledHeader>{header}</StyledHeader>
        <List className={classes.root}>
          {errorMessage &&
            errorMessage.map((message: string, index: number) => (
              <>
                <Divider component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText
                    key={`error-${index}`}
                    primary={`${index + 1}: ${message}`}
                  />
                </ListItem>
                <Divider component="li" />
              </>
            ))}
        </List>
      </>
    </StyledErrorPanel>
  );
};
