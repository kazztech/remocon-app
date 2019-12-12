import React from 'react';
import { makeStyles, Container } from '@material-ui/core';
import AppHeader from '../../components/AppHeader';

const styles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(1)
    }
}));

interface SettingProps {
    changePage(id: number): void
};
const Setting: React.FC<SettingProps> = (props: SettingProps) => {
    const classes = styles();

    React.useEffect(() => {
        props.changePage(40001);
    }, []);

    return (
        <>
            <Container className={classes.container}>
                Setting
            </Container>
        </>
    );
}

export default Setting;
