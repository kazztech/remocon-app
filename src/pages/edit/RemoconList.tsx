import React from 'react';
import { makeStyles, Container, Button } from '@material-ui/core';
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
    React.useEffect(() => {
        props.changePage(21001);
    }, []);

    const classes = styles();

    return (
        <>
            <Container className={classes.container}>
                RemoconList
                <Button
                    component={Link}
                    to="/edit/remocons/create/input"
                    color="primary"
                    variant="contained"
                >
                    リモコン新規作成
                </Button>
                <Button
                    component={Link}
                    to={`/edit/remocons/${1}`}
                    color="primary"
                    variant="contained"
                >
                    リモコン1
                </Button>
                <Button
                    component={Link}
                    to={`/edit/remocons/${2}`}
                    color="primary"
                    variant="contained"
                >
                    リモコン2
                </Button>
            </Container>
        </>
    );
}

export default RemoconList;
