import React from 'react';

//Components Metarials
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

//Icons
import LockIcon from '@material-ui/icons/Lock';


// Component message (message with a specifique icon for private one) use in Message.js component
const Message = ({ data = data.message, style }) => {
    return (
        <Grid className={style} container alignItems='center' >
            <Grid item xs={11}>
                <Paper elevation={3} style={{ padding: 10 }}>
                    <Typography>{data.body[0].toUpperCase() + data.body}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={1}>
                <Grid container justifyContent='center'>
                    {data.private && <LockIcon />}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Message;