import { Box, Typography } from '@mui/material';
import React from 'react';
import { Navbar } from '../../components';
import { drawerItemConfigs } from 'configs';
import { ProfileBtn, AddBtn, ClassCard } from './components';
import { bodyContainer, cardContainer } from './style';
import { FormData, ClassData } from './type';
import ClassroomRepository from './service';

const repository = new ClassroomRepository();

const Dashboard = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [classes, setClasses] = React.useState<ClassData[]>([]); //TODO: REPLACE USING REDUX

  React.useEffect(() => {
    setLoading(true);
    repository.get().then((data: ClassData[]) => {
      console.log('log ~ file: index.tsx ~ line 19 ~ repository.get ~ data', data);
      setClasses(data);
      setLoading(false);
    });
  }, []);

  const handleCreateClass = (form: FormData) => {
    setLoading(true);
    repository.create(form).then((d) => {
      console.log(d);
      setLoading(false);
      setClasses((prv) => [...prv, d]);
    });
  };

  return (
    <React.Fragment>
      <Navbar items={drawerItemConfigs} loading={loading}>
        <>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🎓Classroom
          </Typography>

          <div>
            <AddBtn handleSubmit={handleCreateClass} />
            <ProfileBtn />
          </div>
        </>
      </Navbar>
      {!loading && (
        <Box sx={bodyContainer}>
          <Box sx={cardContainer}>
            {classes.map((c: ClassData, index: number) => (
              <ClassCard key={index} title={c.title} section={c.section} onClick={() => {}} />
            ))}
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};

export default Dashboard;
