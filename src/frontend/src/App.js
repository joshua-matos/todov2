import './App.css';
import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import ResponsiveAppBar from "./ResponsiveAppBar";
import {Alert, Button, Grid, OutlinedInput} from '@mui/material';
import LabelBottomNavigation from "./LabelBottomNavigation";
import Box from "@mui/material/Box";
import {DataGrid, GridCellEditStopReasons} from '@mui/x-data-grid';
import TodoCreator from "./TodoCreator";
import Items from "./Items";
import CheckIcon from '@mui/icons-material/Check';
import {GridValueSetterParams} from "@mui/x-data-grid";
import {GridCellEditStopParams} from "@mui/x-data-grid";



// App: Your top-most parent component. material-ui/docs/data/material/getting-started/templates/dashboard/
const App = () => {
    //empty array, initial state of App
    const [appState, setAppState] = useState([])
    const [createdTodo, setCreatedTodo] = useState(null);
    const [text, setText] = useState('')
    const [rowsChecked, setRowsChecked] = useState(null);
    const [alert, setAlert] = useState(false)
    const [editedStatus, setEditedStatus] = useState([])
    const [editedContent, setEditedContent] = useState([])

    const processRowUpdate =  (event) => {
       console.log(event)
        console.log(event.target.value)
        patchMe(event.row.id , event.row.content , event.row.completed)

    }
    const patchMe = (rowId, rowContent, completed) => {
        console.log(rowContent)
        axios.patch('http://localhost:3001/api/items/'+rowId, {
            id: rowId,
            content: rowContent,
            completed: completed
        }).catch(error => console.log(error))
    }

    useEffect(patchMe, []);

    const fetchTextAPI = (event) => {
            axios
                .get('http://numbersapi.com/'+event.id)
                .then(r => setText(r.data))
                .catch((error) => console.log(error));
    }


    const fetchToDoAPI = () => {
        axios
            .get('http://localhost:3001/api/items')
            .then(r => setAppState(r.data))
            .catch((error) => console.log(error));
    }

    useEffect(fetchToDoAPI, [createdTodo]);

    let rows = appState;
    //editable: true
    const columns = [
        {
            field: 'id',
            headerName: 'ID', width: 100

        },
        { field: 'content',
            headerName: 'Content',
            width: 600,
            editable: true,
            // valueSetter: (params: GridValueSetterParams) => {
            //     setEditedContent(params.value)
            //     return { ...params.row};
            // }
        },
        {
            field: 'completed', headerName: 'Completed', width: 100, editable: true,
            // valueSetter: (params: GridValueSetterParams) => {
            //     setEditedStatus(params.value)
            //     return { ...params.row };
            // }
        }

    ];


    const createToDo = (todo1, todo2) => {

        async function postData(url = '', data = {}) {
            // Default options are marked with *
            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            return response.json(); // parses JSON response into native JavaScript objects
        }

        postData('http://localhost:3001/api/items', {
            //"id": Math.floor(Math.random() * 1000),
            "content": todo1,
            "completed": todo2
        }).then(  fetchToDoAPI );

    };

  const deleteTask = (itemID) => {
      axios.delete('http://localhost:3001/api/items/'+itemID)
          .then(r => setAlert(true));
  }
  const deleteTaskStart =( ) =>{
        for (let i = 0; i < rowsChecked.length; i++) {
            deleteTask(rowsChecked[i].id)
        }
    }

    const editTest = (event) => {
      console.log(event)
    }

  return (<Grid container spacing={2} columns={12}>
          <Grid item xs={14}>
              <ResponsiveAppBar />
          </Grid>
          <Grid item xs={1} p={2}>
              &nbsp;
          </Grid>
          <Grid item xs={2} p={2}>
            <TodoCreator createToDo={createToDo}/>
              <br /><>
              <p>Items to be Deleted:
                  <Button  variant="contained"    style={{
                  borderRadius: 5,
                  backgroundColor: "#282828",
                  padding: "5px 5px",
                  fontSize: "18px"
              }}   onClick={() => deleteTaskStart()}>DELETE</Button></p>
              {
                  (alert)
                      ?

                         <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">{setTimeout(() => {
                             setAlert(false); setRowsChecked(null);fetchToDoAPI()}, 3000)}
                             -Success! Your task have been deleted!</Alert>
              : null}
              {
                  (rowsChecked !== null)
                      ?
                      rowsChecked.map(({id, content}) => {
                      return (<>
                          <p style={{
                              borderBottom: "1px solid #000",
                          }}>{content}</p>
                      </>)

                  }) : null
              }</>
          </Grid>
          <Grid item xs={6}  sx={{}}>
              <Box height="100vh" display="flex" flexDirection="column">
                  <Box flex={1} overflow="auto">
                      <div style={{ height: 400, width: '100%', margin:'00px' }}>
                          <DataGrid
                              rows={rows}
                              columns={columns}
                              pageSize={25}
                              rowsPerPageOptions={[25]}
                              checkboxSelection
                              onRowClick={(event) => {
                                  fetchTextAPI(event)
                              }}
                              onSelectionModelChange={(ids) => {
                                  const selectedIDs = new Set(ids);
                                  const selectedRowData = rows.filter((row) =>
                                      selectedIDs.has(row.id)
                              );
                                  setRowsChecked(selectedRowData);
                              }}
                              onCellEditStop={processRowUpdate}
                            //  onRowEditStop={processRowUpdate}
                              perimentalFeatures={{ newEditingApi: true }}

                              autoHeight autoPageSize/>

                      </div>
                  </Box></Box>
          </Grid>
          <Grid item xs={2}>
              <Items text={text} />
          </Grid>
          <Grid item xs={12}>
              <LabelBottomNavigation />
          </Grid>
      </Grid>

  )
}
export default App;
