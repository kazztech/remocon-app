import React from 'react';
import { makeStyles, Container } from '@material-ui/core';
import AppHeader from '../../components/AppHeader';

const styles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(1)
    }
}));

interface ControllerProps {
    changePage(id: number): void;
};
const Controller: React.FC<ControllerProps> = (props: ControllerProps) => {
    const classes = styles();

    React.useEffect(() => {
        props.changePage(10001);
    }, []);

    return (
        <>
            <Container className={classes.container}>
                Controller
            </Container>
        </>
    );
}

export default Controller;
