import { Download, RestartAlt, Save, Upload } from '@mui/icons-material';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Collapse, Box, Stack, Button, Tooltip } from '@mui/material';
import { IAssignment, IStudentInfo, IGradingBody, IGradingAssignment } from 'common/interfaces';
import Utils from 'common/utils';
import { ConfirmDialog, useLoading } from 'components';
import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useGetAssignmentsQuery, useGetAllStudentsQuery } from 'services';
import { gradeSx } from './style';
import { StudentInfoCell, GradeCell } from './subcomponents';
import { toast } from 'react-toastify';

enum Mode {
  CREATE,
  UPDATE,
}

type BoardState = {
  [key: string /* String(row * col) */]: {
    assignment_id: string;
    student_id: string;
    mark: number;
    mode: Mode;
  };
};

const getKey = (row: number, col: number) => '' + row + col;
const isEmpty = (obj: BoardState) => Object.keys(obj).length === 0;

const Grading = () => {
  const navigate = useNavigate();
  const uploadRef = React.createRef<HTMLInputElement>();
  const { id } = useParams<'id'>();
  const { data: assignments, isLoading: isFetchingAssignments } = useGetAssignmentsQuery(id as string);
  const { data: classStudents, isLoading: isFetchingStudents } = useGetAllStudentsQuery(id as string);
  const students = classStudents?.students;

  const [boardState, setBoardState] = React.useState<BoardState>({});
  const [csvFile, setCsvFile] = React.useState<any>(null);
  const [targetAssignmentIndex, setTargetAssignmentIndex] = React.useState<number>(-1);
  const [, setLoading] = useLoading();

  React.useEffect(() => {
    setLoading(Utils.isLoading(isFetchingAssignments, isFetchingStudents));
  }, [isFetchingAssignments, isFetchingStudents]);

  const gradeCellChangeHandle = (mode: Mode, row: number, col: number, value: number) => {
    const key: string = getKey(row, col);
    if (!assignments || !students) return;

    setBoardState((prvState) => ({
      ...prvState,
      [key]: {
        assignment_id: assignments[row]._id as string,
        student_id: students[row].student_id as string,
        mark: value,
        mode: mode,
      },
    }));
  };

  const gradeCellCancelHandle = (row: number, col: number) => {
    const key: string = getKey(row, col);
    if (!assignments || !students) return;

    setBoardState((prvState) => {
      const temp = { ...prvState };
      delete temp[key];
      return temp;
    });
  };

  const getMark = (row: number, col: number) => {
    const key: string = getKey(row, col);
    if (boardState.hasOwnProperty(key)) return boardState[key].mark;
    return undefined;
  };

  const handleUploadBtn = (index: number) => {
    setTargetAssignmentIndex(index);
    if (uploadRef) uploadRef.current?.click();
  };

  const onFileChosen = (ev: any) => {
    const file = ev?.target?.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.warning('File size is too large! Please try another one');
      return;
    }
    setCsvFile(file);
  };

  const onSave = () => {
    console.log(boardState);
  };

  const triggerUpload = () => {
    console.log(csvFile);

    setTargetAssignmentIndex(-1);
    setCsvFile(null);
  };

  return (
    <Collapse timeout={500} appear={true} in={true}>
      <Box sx={{ position: 'relative' }}>
        <TableContainer sx={gradeSx.root}>
          <Table aria-label="simple table" sx={gradeSx.table} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className="fixed-collumn fixed-header" sx={gradeSx.controller}>
                  <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                      color="primary"
                      size="small"
                      variant="outlined"
                      startIcon={<Save />}
                      disabled={isEmpty(boardState)}
                      onClick={onSave}
                    >
                      Save
                    </Button>
                    <Button color="secondary" size="small" variant="outlined" startIcon={<RestartAlt />}>
                      Reset
                    </Button>
                  </Stack>
                </TableCell>

                {assignments?.map((a: IAssignment, indx: number) => (
                  <TableCell key={indx}>
                    <Box className="time">{a.due_date ? `Due at ${Utils.displayDate(a.due_date)}` : 'No due date'}</Box>
                    <Box onClick={() => navigate(`/classroom/${id}/work/details/${a._id}`)} className="assignment_title">
                      {a.title}
                    </Box>
                    <Stack direction="row" className="header_point" justifyContent="space-between">
                      <Box>out of {a.total_points}</Box>
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="Upload grade sheet">
                          <Upload className="icon" onClick={() => handleUploadBtn(indx)} />
                        </Tooltip>
                        <Tooltip title="Dowload grade sheet">
                          <Download className="icon" />
                        </Tooltip>
                      </Stack>
                    </Stack>
                  </TableCell>
                ))}

                <TableCell className="placeholder"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students &&
                students.map((s: IStudentInfo, row: number) => (
                  <TableRow key={row}>
                    <TableCell className="fixed-collumn">
                      <StudentInfoCell student={s} />
                    </TableCell>
                    {assignments?.map((a: IAssignment, col: number) => (
                      <GradeCell
                        key={col}
                        total={a.total_points}
                        mark={getMark(row, col)}
                        onMarkChange={(value) => {
                          gradeCellChangeHandle(Mode.CREATE, row, col, value);
                        }}
                        onCancel={() => {
                          gradeCellCancelHandle(row, col);
                        }}
                      />
                    ))}
                    <TableCell className="placeholder"></TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <input type="file" accept=".csv" style={{ display: 'none' }} id="button-file" onChange={onFileChosen} ref={uploadRef} />

        <ConfirmDialog
          open={targetAssignmentIndex !== -1 && csvFile !== null}
          handleClose={() => {
            setTargetAssignmentIndex(-1);
            setCsvFile(null);
          }}
          title="⚠Alert⚠"
          description="Do you want to upload the grading sheet? Please note that any duplicated records will be overwritten in this process!"
          onConfirm={() => {
            triggerUpload();
          }}
        />
      </Box>
    </Collapse>
  );
};

export default Grading;
