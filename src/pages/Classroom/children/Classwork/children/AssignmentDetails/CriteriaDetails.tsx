import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { IGradeCriteria } from 'common/interfaces';
import React from 'react';

export const CriteriaDetails = ({ criterias }: { criterias: IGradeCriteria[] }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography variant="body1" id="tableTitle" component="div">
          ✒ <b>Grade criteria</b>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Description </TableCell>
                <TableCell align="right">Point</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {criterias.map((c: IGradeCriteria) => (
                <TableRow key={c.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {c.name}
                  </TableCell>
                  <TableCell align="right">{c.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};
