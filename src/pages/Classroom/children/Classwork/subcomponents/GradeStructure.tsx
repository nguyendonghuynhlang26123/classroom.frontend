import { Button, Collapse, Container, Divider, Stack, Typography } from '@mui/material';
import { IAssignment } from 'common/interfaces';
import { AssignmentItem, useClassroomCtx } from 'components';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useGetAssignmentsQuery } from 'services';
import { gradeStructureSx } from './style';

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
        data.map((a: IAssignment, idx: number) => (
          <React.Fragment key={a._id}>
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
            {data.length > idx + 1 && <Divider />}
          </React.Fragment>
        ))}
    </Container>
  );
};
