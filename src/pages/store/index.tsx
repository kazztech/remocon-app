import React from 'react';
import { makeStyles, Container } from '@material-ui/core';
import AppHeader from '../../components/AppHeader';

const styles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(1)
    }
}));

interface StoreProps {
    changePage(id: number): void;
}
const Store: React.FC<StoreProps> = (props: StoreProps) => {
    const classes = styles();

    React.useEffect(() => {
        props.changePage(30001);
    }, []);

    return (
        <>
            <Container className={classes.container}>
                Store
            </Container>
        </>
    );
}

export default Store;
