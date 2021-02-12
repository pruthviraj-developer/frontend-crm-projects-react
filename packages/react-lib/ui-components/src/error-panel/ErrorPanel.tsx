import React, { FC } from 'react';
//import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import styled from '@emotion/styled';
import { ErrorPanelProps } from './IErrorPanel';
import { Colors } from '@hs/utils';

const StyledErrorPanel = styled(Paper)`
  width: '100%';
  border: 1px solid ${Colors.RED[400]};
`;

const StyledHeader = styled.div`
  font-size: 2rem;
  color: white;
  background-color: ${Colors.RED[400]};
  padding: 10px 15px;
  text-align: center;
`;

const ListPanel = styled.div`
  width: '100%';
  position: 'relative';
  overflow: 'auto';
  max-height: '50%';
`;

export const ErrorPanel: FC<ErrorPanelProps> = (props: ErrorPanelProps) => {
  const header = props.header || 'Errors';
  const errorMessage: Array<string> = props.messages || [];

  return (
    <StyledErrorPanel>
      <>
        <StyledHeader>{header}</StyledHeader>
        <ListPanel>
          <List>
            {errorMessage &&
              errorMessage.map((message: string, index: number) => (
                <>
                  <ListItem key={`item-${index}`} alignItems="flex-start">
                    <ListItemText
                      key={`error-${index}`}
                      primary={`${index + 1}: ${message}`}
                    />
                  </ListItem>
                  {index < errorMessage.length - 1 && (
                    <Divider component="li" />
                  )}
                </>
              ))}
          </List>
        </ListPanel>
      </>
    </StyledErrorPanel>
  );
};
