import React from 'react';
import { makeStyles, Container, Button, Typography, Grid, Divider } from '@material-ui/core';
import { Link, RouteComponentProps } from 'react-router-dom';
import Axios from 'axios';

import ErrorScene from "../../components/ErrorScene";
import ConnectingScene from "../../components/ConnectingScene";

const styles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(1)
    },
    remoconTitle: {
        marginTop: theme.spacing(1)
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    button: {
        width: "100%",
        borderRadius: 0
    },
    editButtonsGrid: {
        marginTop: theme.spacing(1)
    }
}));

interface RemoconDetailProps
    extends React.HTMLAttributes<HTMLDivElement>, RouteComponentProps<{ remoconId: string }> {
    changePage(id: number): void
};
interface RemoconsProps {
    id: number;
    name: string;
    priority: number;
    widgets: Array<{}>
}
const RemoconDetail: React.FC<RemoconDetailProps> = (props: RemoconDetailProps) => {
    const classes = styles();
    const remoconId = props.match.params.remoconId;
    const [apiState, setApiState] = React.useState<"connecting" | "error" | "success">("connecting");
    const [remocon, setRemocon] = React.useState<RemoconsProps | undefined>();

    React.useEffect(() => {
        props.changePage(21002);

        Axios.get(`http://192.168.3.200:3000/api/v1/remocons/${remoconId}`, { timeout: 5000 }).then(response => {
            setTimeout(() => {
                setRemocon(response.data.content);
                setApiState("success");
            }, 300);
        }).catch(error => {
            setApiState("error");
        });
    }, []);

    return (
        <>
            <Container className={classes.container}>
                {apiState === "connecting" && (
                    <ConnectingScene text={""} {...props} />
                )}
                {apiState === "error" && (
                    <ErrorScene
                        text="通信に失敗しました"
                        path={`/edit`}
                        btnText="設定画面へ"
                        {...props}
                    />
                )}
                {apiState === "success" && typeof remocon !== "undefined" && (
                    <>
                        <Typography className={classes.remoconTitle} variant="h5">{remocon.name}</Typography>
                        <Typography variant="caption" color="textSecondary">
                            ウィジェットの数({remocon.widgets.length}) 表示優先度({remocon.priority})
                        </Typography>
                        <Grid container spacing={1} className={classes.editButtonsGrid}>
                            <Grid item xs={6}>
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    to={{
                                        pathname: `/edit/remocons/${remoconId}/update/input`,
                                        state: {
                                            inputRemoconName: remocon.name,
                                            inputRemoconPriority: remocon.priority
                                        }
                                    }}
                                    component={Link}
                                >
                                    {"編集"}
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    to={{
                                        pathname: `/edit/remocons/${remoconId}/delete/show`,
                                        state: {
                                            inputRemoconName: remocon.name,
                                            inputRemoconPriority: remocon.priority
                                        }
                                    }}
                                    component={Link}
                                >
                                    {"削除"}
                                </Button>
                            </Grid>
                        </Grid>
                        <Divider className={classes.divider} />
                        <Typography variant="body1">{remocon.name}のウィジェット</Typography>
                        <Grid container spacing={1} className={classes.editButtonsGrid}>
                            <Grid item xs={6}>
                                <Button className={classes.button} variant="contained" color="primary" size="large">
                                    {"ウィジェット追加"}
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button className={classes.button} variant="contained" color="primary" size="large">
                                    {"レイアウト編集"}
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Container>
        </>
    );
}

export default RemoconDetail;
