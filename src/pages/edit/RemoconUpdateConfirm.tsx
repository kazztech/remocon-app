import React from 'react';
import { makeStyles, Container, Button } from '@material-ui/core';
import { Link, RouteComponentProps } from 'react-router-dom';

const styles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(1)
    }
}));

interface RemoconUpdateConfirmProps
    extends React.HTMLAttributes<HTMLDivElement>, RouteComponentProps<{ remoconId: string }> {
    changePage(id: number): void
};
const RemoconUpdateConfirm: React.FC<RemoconUpdateConfirmProps> = (props: RemoconUpdateConfirmProps) => {
    React.useEffect(() => {
        props.changePage(21202);
    }, []);
    
    const classes = styles();
    const remoconId = props.match.params.remoconId;

    let inputRemoconName = "";
    let inputRemoconPriority = "";
    if (typeof props.location.state !== "undefined") {
        const propsState = props.location.state;
        inputRemoconName = propsState.inputRemoconName;
        inputRemoconPriority = propsState.inputRemoconPriority;
    } else {
        return (<div>Error!</div>);
    }

    return (
        <>
            <Container className={classes.container}>
                RemoconUpdateConfirm<br />
                Name: {inputRemoconName}<br/>
                Priority: {inputRemoconPriority} <br />
                <Button
                    component={Link}
                    to={{
                        pathname: `/edit/remocons/${remoconId}/update/input`,
                        state: {
                            inputRemoconName,
                            inputRemoconPriority
                        }
                    }}
                    variant="contained"
                >戻る</Button>
                <Button
                    component={Link}
                    to={{
                        pathname: `/edit/remocons/${remoconId}/update/complete`,
                        state: {
                            inputRemoconName,
                            inputRemoconPriority
                        }
                    }}
                    color="primary"
                    variant="contained"
                >送信</Button>
            </Container>
        </>
    );
}

export default RemoconUpdateConfirm;
