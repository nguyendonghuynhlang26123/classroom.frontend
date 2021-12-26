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
  useFinalizeGradingMutation,
} from 'services';
import { gradeSx } from './style';
import { StudentInfoCell, GradeCell, AssignmentCell, TotalGradeCell } from './subcomponents';
import { toast } from 'react-toastify';

enum Mode {
  CREATE,
  UPDATE,
}

const prepareGradesArray = (
  assignments: IAssignment[] | undefined,
  students: IStudentInfo[] | undefined,
  grading: IGradingAssignment[] | undefined,
): [number[][], boolean[][]] => {
  if (!students || !assignments || !grading) return [[], []];
  const marks: number[][] = Array(students.length)
    .fill(-1)
    .map(() => Array(assignments.length).fill(-1));
  const finalized: boolean[][] = Array(students.length)
    .fill(-1)
    .map(() => Array(assignments.length).fill(false));

  grading.forEach((g) => {
    const row = students.findIndex((s) => s.student_id === g.student_id);
    const col = assignments.findIndex((a) => a._id === g.assignment_id);
    if (marks[row] === undefined || marks[row][col] === undefined) return;
    marks[row][col] = g.mark === undefined ? -1 : g.mark;
    finalized[row][col] = g.status === 'FINAL';
  });
  return [marks, finalized];
};

const Grading = () => {
  const uploadRef = React.createRef<HTMLInputElement>();
  const { id } = useParams<'id'>();
  const { data: assignments, isLoading: isFetchingAssignments } = useGetAssignmentsQuery(id as string);
  const { data: classStudents, isLoading: isFetchingStudents } = useGetAllStudentsQuery(id as string);
  const { data: classGrading, isLoading: isFetchingGradings } = useGetAllGradingQuery(id as string);
  const [createGradingRequest, { isLoading: isCreating }] = useCreateGradingMutation();
  const [updateGradingRequest, { isLoading: isUpdating }] = useUpdateGradingMutation();
  const [importStudentRequest, { isLoading: isImporting }] = useImportGradingMutation();
  const [downloadStudentRequest, { isLoading: isDownloading }] = useDownloadGradingMutation();
  const [finalizeGradingRequest, { isLoading: isSubmitFinalize }] = useFinalizeGradingMutation();

  const students = classStudents?.students;
  const [gradings, finalized] = prepareGradesArray(assignments, students, classGrading);
  const assignmetTotalPoint =
    assignments && assignments.length > 0 ? assignments.map((a) => a.total_points).reduce((prev, cur) => cur + prev) : 0;

  const [csvFile, setCsvFile] = React.useState<any>(null);
  const [targetAssignmentIndex, setTargetAssignmentIndex] = React.useState<number>(-1);
  const [loading, setLoading] = useLoading();

  React.useEffect(() => {
    setLoading(
      Utils.isLoading(
        isFetchingAssignments,
        isFetchingStudents,
        isCreating,
        isUpdating,
        isFetchingGradings,
        isImporting,
        isDownloading,
        isSubmitFinalize,
      ),
    );
  }, [isFetchingAssignments, isFetchingStudents, isCreating, isUpdating, isFetchingGradings, isImporting, isDownloading, isSubmitFinalize]);

  const gradeCellSaveHandle = (mode: Mode, row: number, col: number, value: number) => {
    if (!assignments || !students || value === undefined) return;
    const assignment_id = assignments[col]._id as string;
    const student_id = students[row].student_id as string;
    const payload: IGradingBody = {
      assignment_id: assignment_id,
      student_id: student_id,
      mark: value as number,
    };

    if (mode === Mode.CREATE)
      createGradingRequest({ classId: id as string, body: payload })
        .unwrap()
        .catch((err) => {
          toast.warn('Operation error! ' + err.data);
        });
    else
      updateGradingRequest({ classId: id as string, body: payload })
        .unwrap()
        .catch((err) => {
          toast.warn('Operation error! ' + err.data);
        });
  };

  const getMark = (row: number, col: number) => {
    return gradings[row] !== undefined && gradings[row][col] !== undefined && gradings[row][col] !== -1 ? gradings[row][col] : undefined;
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

  const triggerDownload = (index: number) => {
    if (assignments && assignments[index]) {
      const assignmentId = assignments[index]._id as string;
      const assignmentName = assignments[index].title;
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
    }
  };

  const triggerDownloadTemplate = () => {
    const url = window.URL.createObjectURL(new Blob(['student_id,mark']));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `grading_template.csv`); //or any other extension
    document.body.appendChild(link);
    link.click();
  };

  const finalizeGrade = (index: number) => {
    if (assignments && assignments[index]) {
      const assignmentId = assignments[index]._id as string;
      const assignmentName = assignments[index].title;

      finalizeGradingRequest({ classId: id as string, assignmentId: assignmentId })
        .unwrap()
        .then(() => {
          toast.success(`All grading for assignment ${assignmentName} has been returned to students`);
        })
        .catch((err) => {
          toast.error('Operation failed! ' + err.data);
        });
    }
  };

  const isFinalized = (row: number, col: number) => {
    return finalized[row] !== undefined && finalized[row][col];
  };

  return (
    <Collapse timeout={500} appear={true} in={true}>
      <Box sx={{ position: 'relative' }}>
        <TableContainer sx={gradeSx.root}>
          <Table aria-label="simple table" sx={gradeSx.table} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className="student-collumn header" sx={gradeSx.controller}></TableCell>

                {assignments?.map((a: IAssignment, indx: number) => (
                  <AssignmentCell
                    data={a}
                    onDownloadTemplate={triggerDownloadTemplate}
                    onDownloadGrade={() => triggerDownload(indx)}
                    onUploadGrade={() => handleUploadBtn(indx)}
                    onFinalizeGrade={() => finalizeGrade(indx)}
                    key={indx}
                  />
                ))}

                <TableCell className="total-collumn header ">
                  <Typography color="primary" variant="h6">
                    Total
                  </Typography>
                </TableCell>

                <TableCell className="placeholder">{/* Placeholder */}</TableCell>
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
                        total={a.total_points}
                        mark={getMark(row, col)}
                        finalized={isFinalized(row, col)}
                        onSave={(value) => {
                          if (getMark(row, col) === undefined) gradeCellSaveHandle(Mode.CREATE, row, col, value);
                          else gradeCellSaveHandle(Mode.UPDATE, row, col, value);
                        }}
                      />
                    ))}
                    {gradings[row] && <TotalGradeCell gradeArray={gradings[row]} total={assignmetTotalPoint} />}
                    <TableCell className="placeholder">{/* Placeholder */}</TableCell>
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
