import React from 'react';
import { makeStyles, Container, Button, Paper, Typography } from '@material-ui/core';
import AppHeader from '../../components/AppHeader';
import { Link } from 'react-router-dom';

const styles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(1)
    },
    selectEditMode: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(1)
    },
    selectEditModeTitle: {
        marginBottom: theme.spacing(1)
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
                <Link to="/edit/remocons" style={{ textDecoration: 'none' }}>
                    <Paper className={classes.selectEditMode}>
                        <Typography align="center" variant="h5" className={classes.selectEditModeTitle}>
                            リモコンの管理
                        </Typography>
                        <Typography align="center">
                            リモコンやウィジェットの追加、編集、削除を行います
                        </Typography>
                    </Paper>
                </Link>
                <Link to="/edit/batchs" style={{ textDecoration: 'none' }}>
                    <Paper className={classes.selectEditMode}>
                        <Typography align="center" variant="h5" className={classes.selectEditModeTitle}>
                            一括操作の管理
                        </Typography>
                        <Typography align="center">
                            既に登録されたウィジェットを一度に複数実行するテンプレートを管理します
                        </Typography>
                    </Paper>
                </Link>
            </Container>
        </>
    );
}

export default Edit;
