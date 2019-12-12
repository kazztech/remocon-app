import React from 'react';
import { makeStyles, Container } from '@material-ui/core';
import AppHeader from '../../components/AppHeader';
import { Link } from 'react-router-dom';

const styles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(1)
    }
}));

interface EditProps {
    changePage(id: number): void
};
const Edit: React.FC<EditProps> = (props: EditProps) => {
    const classes = styles();

    React.useEffect(() => {
        props.changePage(20001);
    }, []);

    return (
        <>
            <Container className={classes.container}>
                Edit
                <Link to="/edit/remocons">remoconList</Link>
            </Container>
        </>
    );
}

export default Edit;
