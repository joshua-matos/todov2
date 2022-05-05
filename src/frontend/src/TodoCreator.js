import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Box, Button, FormControl, OutlinedInput} from "@mui/material";
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
        <form onSubmit={handleSubmit(onSubmit)} >
            <Box noValidate autoComplete="off">
                <p>Create your To-Do list using the form below!</p>
                    <OutlinedInput label="content" name="content"  placeholder="Content" onChange={handleChangeContent}/>
                <br/><br/>
                    <OutlinedInput label="completed" placeholder="Status" onChange={handleChangeStatus}/>
                <br/> <br/>
                <Button variant="contained" onClick={() => props.createToDo(formContentValue, formCompleteValue)}>Add Item</Button>
            </Box>
        </form>)
}

export default TodoCreator;