import { IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { useCopyToClipboard } from 'components';
import React from 'react';
import { codeSx } from './style';
import Utils from 'common/utils';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useParams } from 'react-router-dom';

export const ClassCodePanel = ({ code }: { code: string }) => {
  const { id } = useParams<'id'>();
  const [copiedText, copy] = useCopyToClipboard();

  return (
    <Paper sx={codeSx.classCode} variant="outlined">
      <Typography className="title">Classcode</Typography>
      <Stack direction="row" spacing={1} justifyContent="start" alignItems="center">
        <Typography variant="body2" color="primary" className="code">
          {code}
        </Typography>
        <Tooltip title={!copiedText ? 'Copy code ' : 'Copied'}>
          <IconButton
            onClick={() => {
              copy(Utils.getInvitationLinkFormat(id as string, code));
            }}
          >
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Paper>
  );
};
