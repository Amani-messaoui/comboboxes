import * as React from 'react';
import './App.css';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';
import {IconButton, Collapse, FormControl, MenuItem, InputLabel, Button, Alert} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function App() {
  const appData = require('./DataSource.json').Data
  const [SelectName, setSelectName] = React.useState('');
  const [SelectValue, setSelectValue] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<typeof SelectName>) => {
    setSelectName(event.target.value);
  };
  const handleChangeValue = (event: SelectChangeEvent<typeof SelectValue>) => {
    setSelectValue(event.target.value);
  };
   
  const submit = () => {
    const data = {
      Region: SelectName ,
      Profession: SelectValue
    };
    fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json ',
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    setOpen(true)
    setTimeout(()=>{
      setOpen(false)
    }, 1500)
  }

  return (
    <div className='App' >
      <form className="Rectangle-2140">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">{appData[0].name}</InputLabel>
          <Select 
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={SelectName}
            onChange={handleChange}
            label="Name"
          >
            {appData.map((e: any, index: any) =>
             e.values.filter((ex: any)=> ex.keyId === appData[0].id).map((ep: any)=>
              <MenuItem key={index} value={ep.Value}>
                {ep.Value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} >
          <InputLabel id="demo-simple-select-standard-label">{appData[1].name}</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={SelectValue}
            onChange={handleChangeValue}
            label="Value"
          >
            {appData.map((e: any, index: any) =>
             e.values.filter((ex: any)=> ex.keyId === appData[1].id).map((ep: any)=>
              <MenuItem key={index} value={ep.Value}>
                {ep.Value}
              </MenuItem>
              )
            )}
          </Select>
        </FormControl>
        <Button className="Button" variant="contained" 
         onClick={submit} 
         endIcon={<SendIcon />}>
        Send
      </Button>
      </form>
      <Collapse in={open} style ={{ position: "absolute", top: "3%"}}>

        <Alert
        severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          // sx={{ mb: 2 }}
        >
         Your request is successfully sent — <strong>check it out!</strong> <br/>
         <strong>Region : </strong> {SelectName} <br/> 
         <strong>Profession : </strong> {SelectValue}
         
        </Alert>
        </Collapse>

    </div>
  );
}

export default App;
