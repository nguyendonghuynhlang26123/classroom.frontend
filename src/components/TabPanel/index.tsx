import { Collapse } from '@mui/material';
import React from 'react';
import { TabPanelProps } from './type';

export const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => {
  return (
    <Collapse timeout={500} in={value === index} >
      <div role="tabpanel" id={`tabpanel-${index}`} aria-labelledby={`-tab-${index}`} {...other}>
        {value === index && children}
      </div>
    </Collapse>
  );
};
