import React from 'react';
import { makeStyles, Container, Button } from '@material-ui/core';
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
    React.useEffect(() => {
        props.changePage(20001);
    }, []);
    
    const classes = styles();

    return (
        <>
            <Container className={classes.container}>
                Edit
                <Button
                    component={Link}
                    to="/edit/remocons"
                    color="primary"
                    variant="contained"
                >
                    リモコンリスト
                </Button>
                <Button
                    component={Link}
                    to="/edit/batches"
                    color="primary"
                    variant="contained"
                >
                    一括送信リスト
                </Button>
            </Container>
        </>
    );
}

export default Edit;
