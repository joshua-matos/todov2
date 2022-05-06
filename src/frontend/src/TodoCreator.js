import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
//
//     TodoCreator: Creates new items for the To Do list
//


const TodoCreator = (props) => {

    const [formContentValue, setContentValue] = useState('');
    const [formCompleteValue, setFormCompleteValue] = useState('');


    const {handleSubmit} = useForm();

    const onSubmit = React.useCallback((values) => {
        console.log(values);
    }, []);

    const handleChangeContent = (event) => {
        setContentValue(event.target.value)
    }

    const handleChangeStatus = (event) => {
        setFormCompleteValue(event.target.value)
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box noValidate autoComplete="off">
                <p>Create your To-Do list using the form below!</p>
                <FormControl variant="filled" sx={{m: 1, minWidth: 180}}>
                    <OutlinedInput label="content" name="content" placeholder="Content" onChange={handleChangeContent}/>
                </FormControl>
                <br/><br/>
                {/*<OutlinedInput label="completed" placeholder="Status" onChange={handleChangeStatus}/>*/}
                <FormControl variant="filled" sx={{m: 1, minWidth: 180, bgcolor: '#fff'}}>
                    <InputLabel id="select-filled-label">Status</InputLabel>
                    <Select
                        labelId="select-true-or-false"
                        id="select-true-or-false"
                        onChange={handleChangeStatus}
                    >
                        <MenuItem value={true}>True</MenuItem>
                        <MenuItem value={false}>False</MenuItem>
                    </Select>
                </FormControl>
                <br/> <br/>
                <FormControl variant="filled" sx={{m: 1, minWidth: 180, bgcolor: '#fff'}}>
                    <Button variant="contained"
                            sx={{ bgcolor: '#282821'}}
                            onClick={() => props.createToDo(formContentValue, formCompleteValue)}>Add
                        Item</Button>
                </FormControl>
            </Box>
        </form>)
}

export default TodoCreator;