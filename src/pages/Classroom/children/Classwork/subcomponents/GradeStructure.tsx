import { Button, Collapse, Container, Divider, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { IAssignment } from 'common/interfaces';
import { AssignmentItem, NoResourceDisplay, useClassroomCtx } from 'components';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useGetAssignmentsQuery } from 'services';
import { gradeStructureSx } from './style';
import NotFoundImg from 'assets/images/party.svg';

export const GradeStructure = () => {
  const { id } = useParams<'id'>();
  const { data, isLoading } = useGetAssignmentsQuery(id as string);
  const navigate = useNavigate();
  const [expandItemKey, setExpandKey] = React.useState<string | null>(null);

  const toggleExpand = (curExpandKey: string | null, key: string) => {
    if (curExpandKey === key) setExpandKey(null);
    else setExpandKey(key);
  };

  return (
    <Container maxWidth="md" sx={gradeStructureSx.form}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography sx={gradeStructureSx.formHeader} color="primary">
          Grading Structure
        </Typography>
      </Stack>
      {data &&
        (data.length > 0 ? (
          data.map((a: IAssignment, idx: number) => (
            <React.Fragment key={a._id}>
              <Box sx={{ border: 1, borderRadius: 2, borderColor: 'divider', overflow: 'hidden', my: 1 }}>
                <AssignmentItem
                  data={a}
                  expanded={expandItemKey === a._id}
                  onClick={() => toggleExpand(expandItemKey, a._id || '')}
                  colorMode="primary"
                  actionBtns={[
                    <Button color="primary" onClick={() => navigate(`/classroom/${id}/work/details/${a._id}`)}>
                      View assignment
                    </Button>,
                  ]}
                />
              </Box>
            </React.Fragment>
          ))
        ) : (
          <NoResourceDisplay
            title="No work to do!"
            direction="row"
            img={NotFoundImg}
            description={
              <>
                You have no classwork at the moment, <br /> so enjoy this moment and chill!! 🎉🎉
              </>
            }
          />
        ))}
    </Container>
  );
};
