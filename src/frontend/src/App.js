import './App.css';
import * as React from 'react';
import {useEffect, useState} from 'react';
import axios from "axios";
import ResponsiveAppBar from "./ResponsiveAppBar";
import {Alert, Button, FormControl, Grid} from '@mui/material';
import LabelBottomNavigation from "./LabelBottomNavigation";
import Box from "@mui/material/Box";
import {DataGrid} from '@mui/x-data-grid';
import TodoCreator from "./TodoCreator";
import Items from "./Items";
import CheckIcon from '@mui/icons-material/Check';


// App: Your top-most parent component. material-ui/docs/data/material/getting-started/templates/dashboard/
const App = () => {
    const API_URL = 'http://localhost:8080/api/items/'
    //empty array, initial state of App
    const [appState, setAppState] = useState([])
    const [createdTodo, setCreatedTodo] = useState(null);
    const [text, setText] = useState('')
    const [rowsChecked, setRowsChecked] = useState(null);
    const [alert, setAlert] = useState(false)
    const [editedStatus, setEditedStatus] = useState([])
    const [editedContent, setEditedContent] = useState([])
    const [editedRowId, setEditedRowId] = useState([])

    const processRowUpdate = (event) => {
        //The current state
        if (event.row !== null) {
            setEditedContent(event.row.content);
            setEditedStatus(event.row.completed);
            setEditedRowId(event.row.id)
        }
    }


    const handleRowEditCommit = async (params) => {
        //what you changed
        const id = params.id;
        const key = params.field;
        const value = params.value;

        //TODO --- wait for processUpdate to finish because it is setting the state...
        if (key === 'completed') {
            patchMe(id, key, value)
            setEditedStatus(null)
            setEditedRowId(null)
        } else if (key === 'content') {
            patchMe(id, key, value)
            setEditedContent(null)
            setEditedRowId(null)
        }

    };

    const patchMe = (rowId, key, value) => {

        if (key === 'completed') {
            let newValue = false;

            if (value === true) {
                newValue = true;
            }

            axios.patch(API_URL + rowId, {
                id: rowId,
                completed: newValue
            }).catch(error => console.log(error))
        }

        if (key === 'content') {
            axios.patch(API_URL + rowId, {
                id: rowId,
                content: value
            }).catch(error => console.log(error))
        }
        fetchToDoAPI();
    }

    const fetchTextAPI = (event) => {
        axios
            .get('http://numbersapi.com/' + event.id)
            .then(r => setText(r.data))
            .catch((error) => console.log(error));
    }


    const fetchToDoAPI = () => {
        axios
            .get(API_URL)
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
        {
            field: 'content',
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

        postData(API_URL, {
            //"id": Math.floor(Math.random() * 1000),
            "content": todo1,
            "completed": todo2
        })
        fetchToDoAPI();

    };

    const deleteTask = (itemID) => {
        axios.delete(API_URL + itemID)
            .then(r => setAlert(true));
    }
    const deleteTaskStart = () => {
        for (let i = 0; i < rowsChecked.length; i++) {
            deleteTask(rowsChecked[i].id)
        }
    }


    return (<Grid container spacing={2} columns={12}>
            <Grid item xs={14}>
                <ResponsiveAppBar/>
            </Grid>
            <Grid item xs={1} p={2}>
                &nbsp;
            </Grid>
            <Grid item xs={2} p={2}>
                <TodoCreator createToDo={createToDo}/>
                <br/><>
                <p className="containsLeft"><h4>Items to be Deleted:</h4>
                    <FormControl variant="filled" sx={{m: 1, minWidth: 180, bgcolor: '#fff'}}>
                    <Button variant="contained" style={{
                        borderRadius: 5,
                        backgroundColor: "#282828",
                        padding: "5px 5px",
                        fontSize: "18px"
                    }} onClick={() => deleteTaskStart()}>DELETE</Button></FormControl></p>
                {
                    (alert)
                        ?

                        <Alert icon={<CheckIcon fontSize="inherit"/>} severity="success">{setTimeout(() => {
                            setAlert(false);
                            setRowsChecked(null);
                            fetchToDoAPI()
                        }, 3000)}
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
            <Grid item xs={6} sx={{}}>
                <Box height="83vh" display="flex" flexDirection="column">

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
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
                        perimentalFeatures={{newEditingApi: true}}
                        onCellEditCommit={(params) => setTimeout(handleRowEditCommit(params), 1000)}
                        autoHeight autoPageSize/>


                </Box>
            </Grid>
            <Grid item xs={2}>
                <Items text={text}/>
            </Grid>
            <Grid item xs={12}>
                <LabelBottomNavigation/>
            </Grid>
        </Grid>

    )
}
export default App;
