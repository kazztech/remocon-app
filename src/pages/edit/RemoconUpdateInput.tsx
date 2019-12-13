import React, { useState } from 'react';
import { makeStyles, Container, TextField, Typography, Box, MenuItem, Button } from '@material-ui/core';
import { Link, RouteComponentProps } from 'react-router-dom';

const styles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(1)
    }
}));

interface RemoconUpdateInputProps
    extends React.HTMLAttributes<HTMLDivElement>, RouteComponentProps<{ remoconId: string }> {
    changePage(id: number): void
};
const RemoconUpdateInput: React.FC<RemoconUpdateInputProps> = (props: RemoconUpdateInputProps) => {
    React.useEffect(() => {
        props.changePage(21201);
    }, []);

    const classes = styles();
    const remoconId = props.match.params.remoconId;
    const propsState = props.location.state;

    // 入力値.リモコン名
    const [inputRemoconName, setInputRemoconName] = useState<string>(
        typeof propsState !== "undefined" ? propsState.inputRemoconName : ""
    );
    const handleInputRemoconName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputRemoconName(e.target.value);
    }

    // 入力値.表示優先度
    const [inputRemoconPriority, setInputRemoconPriority] = useState<string>(
        typeof propsState !== "undefined" ? propsState.inputRemoconPriority : "3"
    );
    const handleInputRemoconPriority = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputRemoconPriority(e.target.value);
    }

    return (
        <>
            <Container className={classes.container}>
                <Typography>RemoconUpdateInput</Typography>
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
                        value={inputRemoconPriority}
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
                        to={{
                            pathname: `/edit/remocons/${remoconId}/update/confirm`,
                            state: {
                                inputRemoconName,
                                inputRemoconPriority
                            }
                        }}
                        color="primary"
                        variant="contained"
                    >次へ</Button>
                </Box>
            </Container>
        </>
    );
}

export default RemoconUpdateInput;
