import React, { useState } from 'react';
import { makeStyles, Container, TextField, Typography, Box, MenuItem, Button } from '@material-ui/core';
import { Link, RouteComponentProps } from 'react-router-dom';

const styles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(1)
    }
}));

interface RemoconCreateInputProps
    extends React.HTMLAttributes<HTMLDivElement>, RouteComponentProps<{ remoconId: string }> {
    changePage(id: number): void
};
const RemoconCreateInput: React.FC<RemoconCreateInputProps> = (props: RemoconCreateInputProps) => {
    const classes = styles();

    const [inputRemoconName, setInputRemoconName] = useState<string>("");
    const handleInputRemoconName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputRemoconName(e.target.value);
    }

    const [inputRemoconPriotiry, setInputRemoconPriotiry] = useState<string>("3");
    const handleInputRemoconPriority = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputRemoconPriotiry(e.target.value);
    }

    React.useEffect(() => {
        props.changePage(21101);
    }, []);

    return (
        <>
            <Container className={classes.container}>
                <Typography>RemoconCreateInput</Typography>
                <Box>
                    <TextField
                        label="リモコン名"
                        variant="outlined"
                        value={inputRemoconName}
                        onChange={handleInputRemoconName}
                    />
                </Box>
                <Box>
                    <TextField
                        select
                        label="Select"
                        value={inputRemoconPriotiry}
                        onChange={handleInputRemoconPriority}
                        variant="outlined"
                    >
                        <MenuItem value={"1"}>
                            1
                        </MenuItem>
                        <MenuItem value={"2"}>
                            2
                        </MenuItem>
                        <MenuItem value={"3"}>
                            3
                        </MenuItem>
                    </TextField>
                </Box>
                <Box>
                    <Button
                        component={Link}
                        to={`/edit/remocons/create/confirm`}
                        color="primary"
                        variant="contained"
                    >次へ</Button>
                </Box>
            </Container>
        </>
    );
}

export default RemoconCreateInput;
