import React from 'react';
import { makeStyles, Container, Button } from '@material-ui/core';
import { Link, RouteComponentProps } from 'react-router-dom';

const styles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(1)
    }
}));

interface RemoconDetailProps
    extends React.HTMLAttributes<HTMLDivElement>, RouteComponentProps<{remoconId: string}> {
        changePage(id: number): void
};
const RemoconDetail: React.FC<RemoconDetailProps> = (props: RemoconDetailProps) => {
    React.useEffect(() => {
        props.changePage(21002);
    }, []);
    
    const classes = styles();
    const remoconId = props.match.params.remoconId;

    return (
        <>
            <Container className={classes.container}>
                RemoconDetail
                <Button
                    to={`/edit/remocons/${remoconId}/update/input`}
                    component={Link}
                    color="primary"
                    variant="contained"
                >更新</Button>
            </Container>
        </>
    );
}

export default RemoconDetail;
