import React from 'react';
import { makeStyles, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(1)
    }
}));

interface RemoconListProps {
    changePage(id: number): void
};
const RemoconList: React.FC<RemoconListProps> = (props: RemoconListProps) => {
    const classes = styles();

    React.useEffect(() => {
        props.changePage(20002);
    }, []);

    return (
        <>
            <Container className={classes.container}>
                RemoconList
                <Link to="/edit/remocons/1">Detail</Link>
            </Container>
        </>
    );
}

export default RemoconList;
