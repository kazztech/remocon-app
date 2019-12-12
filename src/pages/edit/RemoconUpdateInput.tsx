import React from 'react';
import { makeStyles, Container } from '@material-ui/core';

const styles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(1)
    }
}));

interface RemoconUpdateInputProps {
    changePage(id: number): void
};
const RemoconUpdateInput: React.FC<RemoconUpdateInputProps> = (props: RemoconUpdateInputProps) => {
    const classes = styles();

    React.useEffect(() => {
        props.changePage(20004);
    }, []);

    return (
        <>
            <Container className={classes.container}>
                RemoconUpdateInput
            </Container>
        </>
    );
}

export default RemoconUpdateInput;
