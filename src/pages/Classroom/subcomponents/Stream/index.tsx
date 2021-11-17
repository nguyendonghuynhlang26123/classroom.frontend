import { InfoOutlined, Info } from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, IconButton, Stack, Collapse, Typography, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Classroom, UserRole } from 'common/interfaces';
import React from 'react';
import { bannerSx } from './style';
import { StreamProps } from './type';
import { useCopyToClipboard } from 'components';

export const StreamTab = ({ classData, role }: StreamProps) => {
  const [copiedText, copy] = useCopyToClipboard();
  const [details, showDetails] = React.useState<boolean>(true);

  const toggleShowDetails = () => {
    showDetails((prvState) => !prvState);
  };

  return (
    <Box minHeight="100vh">
      {/* BANNER */}
      <Card sx={bannerSx.card} elevation={details ? 4 : 0}>
        <CardMedia component="img" height="240" image={classData.image} alt="bg" />
        <Stack spacing={2} direction="row" sx={bannerSx.card_stack}>
          <Box sx={bannerSx.header}>
            <Box sx={bannerSx.header_title}>{classData.title}</Box>
            <Box sx={bannerSx.header_section}>{classData.section}</Box>
          </Box>

          <IconButton onClick={toggleShowDetails}>{details ? <Info /> : <InfoOutlined />}</IconButton>
        </Stack>

        <Collapse in={details}>
          <CardContent sx={bannerSx.content}>
            {role !== UserRole.STUDENT && (
              <Stack direction="row" sx={bannerSx.expand_row}>
                <Typography variant="body2">Class code</Typography>
                <Typography variant="body2">{classData.code}</Typography>
                <Tooltip title={!copiedText ? 'Copy invitation link' : 'Copied'}>
                  <IconButton
                    onClick={() => {
                      copy(
                        `${window.location.origin}/#/classes/join?classId=${classData._id}&role=STUDENT&code=${classData.code}`,
                      );
                    }}
                  >
                    <ContentCopyIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Tooltip>
              </Stack>
            )}
            {classData?.subject && (
              <Stack direction="row" sx={bannerSx.expand_row}>
                <Typography variant="body2">Subject</Typography>
                <Typography variant="body2">{classData.subject}</Typography>
              </Stack>
            )}
            {classData?.room && (
              <Stack direction="row" sx={bannerSx.expand_row}>
                <Typography variant="body2">Room</Typography>
                <Typography variant="body2">{classData.room}</Typography>
              </Stack>
            )}
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};
