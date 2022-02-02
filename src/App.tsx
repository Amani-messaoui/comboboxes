import * as React from 'react';
import './App.css';
import Select from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';
import { IconButton, Collapse, FormControl, MenuItem, InputLabel, Button, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function App() {
  const appData = require('./DataSource.json').Data
  const [SelectName, setSelectName] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleChange =(e: any , i: any)=> {
    let values = [SelectName] as  any;
    for (let i = 0; i < values.length; i++) {
      if(values[i].length >= 0 ){
        values[i].push(e.target.value);  
      } 
    }
    return  setSelectName(values[0] = SelectName);
  }

  const submit = () => {
    const data = SelectName;
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
    setTimeout(() => {
      setOpen(false)
      setSelectName([])
    }, 1500)
  }


  return (
    <div className='App' >
      <form className="Rectangle-2140">
        {appData.map((em: any, i: any) =>
          <FormControl  key={i} variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">{em.name}</InputLabel>
             <Select             
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={SelectName[i]}
              onChange={(e: any) => handleChange(e, i)}
              label="Name">
              {em.values.filter((ex: any) => ex.keyId === em.id).map((ep: any, index: any ) =>
                <MenuItem  key={index} value={ep.value}  >
                 {ep.value}
                </MenuItem>
              )}
            </Select> 
          </FormControl>
        )}
        <Button className="Button" variant="contained"
          onClick={submit}
          endIcon={<SendIcon />}>
          Send
        </Button>
      </form>
      <Collapse in={open} style={{ position: "absolute", top: "3%" }}>

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
        >
          Your request is successfully sent — <strong>check it out!</strong> <br />
      
        </Alert>
      </Collapse>

    </div>
  );
}

export default App;
