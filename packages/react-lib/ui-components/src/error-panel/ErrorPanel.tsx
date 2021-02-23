import React, { FC } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import styled from '@emotion/styled';
import { Colors } from '@hs/utils';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { ErrorPanelProps } from './IErrorPanel';

const StyledErrorPanel = styled(Paper)`
  width: '100%';
  border: 1px solid ${Colors.RED[400]};
  margin: 15px;
`;

const StyledHeader = styled.div`
  font-size: 2rem;
  color: ${Colors.WHITE};
  background-color: ${Colors.RED[400]};
  text-align: center;
`;

const StyledCopytoClipboard = styled.div`
  display: inline-flex;
  margin: 5px;
  border-radius: 50%;
  background: ${Colors.WHITE};
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 400,
    },
  })
);

export const ErrorPanel: FC<ErrorPanelProps> = (props: ErrorPanelProps) => {
  const header = props.header || 'Errors';
  const errorMessage: Array<string> = props.messages || [];
  const classes = useStyles();

  const copyToClipboard = () => {
    const textField = document.createElement('textarea');
    textField.innerText = errorMessage.toString();
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  };

  return (
    <StyledErrorPanel>
      <StyledHeader>
        {header}
        <StyledCopytoClipboard onClick={copyToClipboard}>
          <IconButton>
            <FileCopyOutlinedIcon fontSize="large" />
          </IconButton>
        </StyledCopytoClipboard>
      </StyledHeader>
      {errorMessage.length > 0 && (
        <List key={'error-list'} className={classes.root}>
          {errorMessage.map((message: string, index: number) => (
            <>
              <ListItem key={`item-${index}`} alignItems="flex-start">
                <ListItemText
                  key={`error-${index}`}
                  primary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="h5"
                        color="textPrimary"
                      >
                        {`${index + 1}: ${message}`}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              {index < errorMessage.length - 1 && <Divider component="li" />}
            </>
          ))}
        </List>
      )}
    </StyledErrorPanel>
  );
};
