import { Download, RestartAlt, Save, Upload } from '@mui/icons-material';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Collapse,
  Box,
  Stack,
  Button,
  Tooltip,
  Typography,
  Link,
} from '@mui/material';
import { IAssignment, IStudentInfo, IGradingBody, IGradingAssignment } from 'common/interfaces';
import Utils from 'common/utils';
import { ConfirmDialog, useLoading } from 'components';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetAssignmentsQuery,
  useGetAllStudentsQuery,
  useCreateGradingMutation,
  useUpdateGradingMutation,
  useGetAllGradingQuery,
  useImportGradingMutation,
  useDownloadGradingMutation,
} from 'services';
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

const prepareGradesArray = (
  assignments: IAssignment[] | undefined,
  students: IStudentInfo[] | undefined,
  grading: IGradingAssignment[] | undefined,
): number[][] => {
  if (!students || !assignments || !grading) return [];
  const marks: number[][] = Array(students.length)
    .fill(-1)
    .map(() => Array(assignments.length).fill(-1));

  grading.forEach((g) => {
    const row = students.findIndex((s) => s.student_id === g.student_id);
    const col = assignments.findIndex((a) => a._id === g.assignment_id);
    if (marks[row] === undefined || marks[row][col] === undefined) return;
    marks[row][col] = g.mark === undefined ? -1 : g.mark;
  });
  return marks;
};

const Grading = () => {
  const navigate = useNavigate();
  const uploadRef = React.createRef<HTMLInputElement>();
  const { id } = useParams<'id'>();
  const { data: assignments, isLoading: isFetchingAssignments } = useGetAssignmentsQuery(id as string);
  const { data: classStudents, isLoading: isFetchingStudents } = useGetAllStudentsQuery(id as string);
  const { data: classGrading, isLoading: isFetchingGradings } = useGetAllGradingQuery(id as string);
  const [createGradingRequest, { isLoading: isCreating }] = useCreateGradingMutation();
  const [updateGradingRequest, { isLoading: isUpdating }] = useUpdateGradingMutation();
  const [importStudentRequest, { isLoading: isImporting }] = useImportGradingMutation();
  const [downloadStudentRequest, { isLoading: isDownloading }] = useDownloadGradingMutation();
  const students = classStudents?.students;
  const gradings = prepareGradesArray(assignments, students, classGrading);
  const assignmetTotalPoint =
    assignments && assignments.length > 0 ? assignments.map((a) => a.total_points).reduce((prev, cur) => cur + prev) : 0;

  const [boardState, setBoardState] = React.useState<BoardState>({});
  const [allowSave, setAllowSave] = React.useState<boolean>(false);
  const [csvFile, setCsvFile] = React.useState<any>(null);
  const [targetAssignmentIndex, setTargetAssignmentIndex] = React.useState<number>(-1);
  const [enableEdit, setEnableEdit] = React.useState<boolean>(false);
  const [loading, setLoading] = useLoading();

  React.useEffect(() => {
    setLoading(
      Utils.isLoading(isFetchingAssignments, isFetchingStudents, isCreating, isUpdating, isFetchingGradings, isImporting, isDownloading),
    );
  }, [isFetchingAssignments, isFetchingStudents, isCreating, isUpdating, isFetchingGradings, isImporting, isDownloading]);

  const gradeCellChangeHandle = (mode: Mode, row: number, col: number, value: number) => {
    const key: string = getKey(row, col);
    if (!assignments || !students) return;

    setBoardState((prvState: BoardState) => {
      const isValid = undefined === Object.values(prvState).find((s) => s.mark > assignments[col].total_points);
      setAllowSave(isValid);

      return {
        ...prvState,
        [key]: {
          assignment_id: assignments[col]._id as string,
          student_id: students[row].student_id as string,
          mark: value,
          mode: mode,
        },
      };
    });
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
    return gradings[row] !== undefined && gradings[row][col] !== undefined && gradings[row][col] !== -1 ? gradings[row][col] : undefined;
  };

  const getStudentTotalPoint = (row: number) => {
    const totalPoint = gradings[row] && gradings[row].length > 0 ? gradings[row].reduce((prv, cur) => (cur !== -1 ? prv + cur : prv)) : -1;
    return totalPoint === -1 ? 0 : totalPoint;
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
    if (isEmpty(boardState) || !allowSave) return;
    const creatingPayload = Object.values(boardState).filter((s) => s.mode === Mode.CREATE);
    const updatingPayload = Object.values(boardState).filter((s) => s.mode === Mode.UPDATE);

    const savingTask = async () => {
      return await Promise.all([
        createGradingRequest({ classId: id as string, body: creatingPayload as IGradingBody[] }).unwrap(),
        updateGradingRequest({ classId: id as string, body: updatingPayload as IGradingBody[] }).unwrap(),
      ]);
    };

    //Disable state
    setEnableEdit(false);
    setBoardState({});

    savingTask()
      .then(() => {
        toast.success('Update operation suceeded');
        setEnableEdit(true);
      })
      .catch((err) => {
        toast.warn('Operation error! ' + err.data);
        setEnableEdit(true);
      });
  };

  const triggerUpload = (assignmentId: string) => {
    const form = new FormData();
    if (csvFile) form.append('csv', csvFile);
    importStudentRequest({ classId: id as string, assignmentId: assignmentId, body: form })
      .unwrap()
      .then(() => {
        toast.success('Import completed! Grading results are now updated');
      })
      .catch((err) => {
        toast.error('Import grading data failed! ' + err.data);
      });

    setTargetAssignmentIndex(-1);
    setCsvFile(null);
  };

  const triggerDownload = (assignmentName: string, assignmentId: string) => {
    downloadStudentRequest({ classId: id as string, assignmentId: assignmentId })
      .unwrap()
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `grading_${Utils.sanitizeString(assignmentName)}.csv`); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        toast.error('Download grading data failed! ' + err.data);
      });
  };

  const triggerDownloadTemplate = () => {
    const url = window.URL.createObjectURL(new Blob(['student_id,mark']));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `grading_template.csv`); //or any other extension
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Collapse timeout={500} appear={true} in={true}>
      <Box sx={{ position: 'relative' }}>
        <TableContainer sx={gradeSx.root}>
          <Table aria-label="simple table" sx={gradeSx.table} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className="student-collumn header" sx={gradeSx.controller}>
                  <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                      color="primary"
                      size="small"
                      variant="outlined"
                      startIcon={<Save />}
                      disabled={isEmpty(boardState) || !allowSave || loading}
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
                        <Tooltip
                          arrow
                          title={
                            <Typography id="tooltip-text" sx={{ fontSize: 12 }}>
                              Upload grade sheet{' '}
                              <Link href="#" sx={{ fontSize: 12, color: 'yellow' }} onClick={triggerDownloadTemplate}>
                                Download template here
                              </Link>
                            </Typography>
                          }
                        >
                          <Upload className="icon" onClick={() => handleUploadBtn(indx)} />
                        </Tooltip>
                        <Tooltip title="Dowload grade sheet" onClick={() => triggerDownload(a.title, a._id as string)}>
                          <Download className="icon" />
                        </Tooltip>
                      </Stack>
                    </Stack>
                  </TableCell>
                ))}

                <TableCell className="total-collumn header ">
                  <Typography color="primary" variant="h6">
                    Total
                  </Typography>
                </TableCell>

                <TableCell className="placeholder"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gradings &&
                students?.map((s: IStudentInfo, row: number) => (
                  <TableRow key={row}>
                    <TableCell className="student-collumn">
                      <StudentInfoCell student={s} />
                    </TableCell>
                    {assignments?.map((a: IAssignment, col: number) => (
                      <GradeCell
                        key={col}
                        enableEdit={enableEdit}
                        total={a.total_points}
                        mark={getMark(row, col)}
                        onMarkChange={(value) => {
                          if (getMark(row, col) === undefined) gradeCellChangeHandle(Mode.CREATE, row, col, value);
                          else gradeCellChangeHandle(Mode.UPDATE, row, col, value);
                        }}
                        onCancel={() => {
                          gradeCellCancelHandle(row, col);
                        }}
                      />
                    ))}
                    {gradings[row] && gradings[row].length > 0 && (
                      <TableCell className="total-collumn">
                        <Typography variant="body1">{getStudentTotalPoint(row)}</Typography>
                        <Typography variant="body2">/{assignmetTotalPoint}</Typography>
                      </TableCell>
                    )}
                    <TableCell className=""></TableCell>
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
            if (assignments && targetAssignmentIndex !== -1) triggerUpload(assignments[targetAssignmentIndex]._id as string);
          }}
        />
      </Box>
    </Collapse>
  );
};

export default Grading;
