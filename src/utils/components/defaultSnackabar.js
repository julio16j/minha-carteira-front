import React from "react";
import Snackbar from '@mui/material/Snackbar';
export default function DefaultSnackbar ({props, setProps}) {
    return (
        <Snackbar
            open={props.open}
            autoHideDuration={5000}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            onClose={()=>setProps({...props, open: false})}
            message={props.message}/>
    )
}