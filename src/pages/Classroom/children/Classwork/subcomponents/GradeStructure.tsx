import { Button, Container, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import NotFoundImg from 'assets/images/party.svg';
import { IAssignment, IGradingAssignment } from 'common/interfaces';
import Utils from 'common/utils';
import { AssignmentItem, NoResourceDisplay, useClassroomCtx, useLoading } from 'components';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useFetchFinalGradesMutation, useGetAssignmentsQuery } from 'services';
import { gradeStructureSx } from './style';

export const GradeStructure = () => {
  const { id } = useParams<'id'>();
  const navigate = useNavigate();
  const { role, studentId } = useClassroomCtx();
  const { data, isLoading } = useGetAssignmentsQuery(id as string);
  const [fetchMyGrading, { data: gradings, isLoading: isFetching }] = useFetchFinalGradesMutation();
  const [expandItemKey, setExpandKey] = React.useState<string | null>(null);
  const [overall, setOverall] = React.useState<number>(0);
  const [total, setTotal] = React.useState<number>(0);
  const [, setLoading] = useLoading();

  React.useEffect(() => {
    if (gradings && gradings.length > 0 && data) {
      let _overall = 0;
      let _total = 0;
      gradings.forEach((g: IGradingAssignment) => {
        _overall += g.mark ?? 0;
        const assignment = data.find((a: IAssignment) => a._id === g.assignment_id);
        if (assignment) _total += assignment.total_points;
      });
      setOverall(_overall);
      setTotal(_total);
    }
  }, [gradings]);

  React.useEffect(() => {
    if (studentId) fetchMyGrading({ classId: id as string, studentId: studentId });
  }, [studentId]);

  React.useEffect(() => {
    setLoading(Utils.isLoading(isLoading, isFetching));
  }, [isLoading, isFetching]);

  const toggleExpand = (curExpandKey: string | null, key: string) => {
    if (curExpandKey === key) setExpandKey(null);
    else setExpandKey(key);
  };

  const getMark = (id: string): number | undefined => {
    if (gradings) {
      const g: IGradingAssignment = gradings.find((g: IGradingAssignment) => g.assignment_id === id);
      if (g) return g.mark;
    }
    return undefined;
  };

  return (
    <Container maxWidth="md" sx={gradeStructureSx.form}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography sx={gradeStructureSx.formHeader} color="primary">
          Classwork
        </Typography>
        {studentId && gradings ? (
          <Typography color="primary">
            Overall: <b>{overall}</b>/{total} ({gradings.length} graded works)
          </Typography>
        ) : (
          <Typography color="error" fontSize={14}>
            Your account is not synced to view grading!
          </Typography>
        )}
      </Stack>
      {data &&
        (data.length > 0 ? (
          data.map((a: IAssignment, idx: number) => (
            <React.Fragment key={a._id}>
              <Box sx={{ border: 1, borderRadius: 2, borderColor: 'divider', overflow: 'hidden', my: 1 }}>
                <AssignmentItem
                  data={a}
                  mark={getMark(a._id as string)}
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
                Your class has no classwork, <br /> so enjoy this moment and chill!! 🎊🎮🎵
              </>
            }
          />
        ))}
    </Container>
  );
};
