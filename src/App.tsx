import React, { useState, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import { Box, Button, Chip, IconButton, Snackbar, TextField, Toolbar, Typography } from '@mui/material';
import { navURLs } from './consts/navigationConsts';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CopyAllOutlined from '@mui/icons-material/CopyAllOutlined';
import Close from '@mui/icons-material/Close';
import { announcementTextOptions } from './consts/announcementTextOptions';

const maxWords = 30;

export function App() {

  const searchRef = useRef<HTMLInputElement>(null);

  const [acValue, setAcValue] = useState('');
  const [segments, setSegments] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const onCopyText = () => {
    handleOpen();
    setSegments([]);
    setAcValue('');
  };

  console.log('searchRef', searchRef);

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense" disableGutters>
          <Typography variant="h1" fontSize="16px" marginLeft="12px">
            Station 13 Announcement Text Whitelist
          </Typography>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route
          path={navURLs.home()}
          element={
            <div style={{ padding: '12px' }}>

              <Box display="flex" flexDirection="row" margin={({ spacing }) => spacing(1, 2)}>
                <CopyToClipboard text={segments.join(' ')} onCopy={onCopyText}>
                  <CopyAllOutlined sx={{ cursor: 'pointer' }}/>
                </CopyToClipboard>
                <Typography>
                  {segments.join(' ')}
                </Typography>
              </Box>
              <TextField
                inputRef={searchRef}
                id="search"
                label="Search"
                value={acValue}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setAcValue(event.target.value);
                }}
                helperText={`${segments.length}/${maxWords} words & ${segments.join(' ').length} Characters`}
              />
              <Box gap={1}>
                {announcementTextOptions
                  .filter(word => {
                    return word.toLowerCase().includes(acValue.toLowerCase())
                  })
                  .sort((wordA) => {
                    return wordA.toLowerCase() === acValue.toLowerCase()
                      ? -1
                      : 1;
                  })
                  .map(word => {
                    const wordSplit = word.toLowerCase().split(acValue.toLowerCase());
                    const label = wordSplit.length > 1 && acValue.length > 1
                      ? wordSplit.map((wordSeg, idx) => idx % 2 === 0 ? <span>{wordSeg}<mark>{acValue}</mark></span> : <span>{wordSeg}</span>)
                      : [<span>{word}</span>]; 
                    return (
                      <Chip
                        label={
                          <p>
                            <span>
                              {label}
                            </span>
                          </p>
                        }
                        sx={{ margin: '6px' }}
                        disabled={segments.length === maxWords}
                        onClick={() => {
                          setSegments([...segments, word]);
                          setAcValue('');

                          searchRef?.current?.focus();
                        }}
                        variant={segments.some(seg => seg === word) ? 'filled' : 'outlined'}
                      />
                    )
                  })
                }
              </Box>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Copied to Clipboard"
                action={action}
              />
            </div>
          }
        />
      </Routes>
    </>
  )
}