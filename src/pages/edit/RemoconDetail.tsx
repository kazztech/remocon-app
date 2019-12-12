import React from 'react';
import { makeStyles, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(1)
    }
}));

interface RemoconDetailProps {
    changePage(id: number): void
};
const RemoconDetail: React.FC<RemoconDetailProps> = (props: RemoconDetailProps) => {
    const classes = styles();

    React.useEffect(() => {
        props.changePage(20003);
    }, []);

    return (
        <>
            <Container className={classes.container}>
                RemoconDetail
                <Link to="/edit/remocons/1/update/input">Update</Link>
            </Container>
        </>
    );
}

export default RemoconDetail;
