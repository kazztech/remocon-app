import React from 'react';
import { makeStyles, Container, Button, Typography, Grid, Divider } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import DeleteIcon from '@material-ui/icons/Delete';
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
    },
    icon: {
        marginRight: theme.spacing(1 / 2)
    }
}));

interface RemoconDetailProps
    extends React.HTMLAttributes<HTMLDivElement>, RouteComponentProps<{ remoconId: string }> {
    changePage(id: number): void
};
interface WidgetType {
    id: number;
    label: {
        text: string,
        color: string
    };
    icon: {
        style: string,
        color: string
    };
    position: {
        x: number,
        y: number
    },
    irPattern: number[]
}

interface RemoconType {
    id: number;
    priority: number;
    name: number;
    widgets: WidgetType[]
}

const RemoconDetail: React.FC<RemoconDetailProps> = (props: RemoconDetailProps) => {
    const classes = styles();
    const remoconId = props.match.params.remoconId;
    const [apiState, setApiState] = React.useState<"connecting" | "error" | "success">("connecting");
    const [remocon, setRemocon] = React.useState<RemoconType | null>(null);

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

    const Widgets = (props: RemoconDetailProps) => {
        const sortedWidgets = (() => {
            if (remocon === null) return [];
            const maxLength = 64;
            const result = [];
            for (let i = 0; i < maxLength; i++) {
                const r = remocon.widgets.find((widget: WidgetType) => (
                    widget.position.y * 4 + widget.position.x === i
                ));
                if (typeof r === "undefined") {
                    result.push(null);
                } else {
                    result.push(r);
                }
            }
            return result;
        })();

        return (
            <>
                {sortedWidgets.map((widget, index) => (
                    <Grid key={index} item xs={3}>
                        {widget !== null ?
                            <Button
                                fullWidth
                                style={{
                                    borderRadius: 0,
                                    fontSize: 15,
                                    height: 56,
                                    padding: "4px",
                                    lineHeight: 1.5,
                                    textAlign: "center"
                                }}
                                variant="contained"
                                color="primary"
                                size="large"
                                component={Link}
                                to={{
                                    pathname: `/edit/remocons/${remoconId}/widgets/${widget.id}/update/input`,
                                    state: {
                                        inputWidgetLabelText: widget.label.text,
                                        inputWidgetIconColor: widget.label.color,
                                        inputWidgetIconStyle: widget.icon.style,
                                        selectPosition: widget.position.y * 4 + widget.position.x,
                                        irPattern: widget.irPattern
                                    }
                                }}
                            >
                                {widget.label.text}
                            </Button>
                            :
                            <Button
                                fullWidth
                                style={{
                                    borderRadius: 0,
                                    fontSize: 15,
                                    height: 56,
                                    padding: "4px",
                                    lineHeight: 1.5,
                                    color: "silver"
                                }}
                                component={Link}
                                to={{
                                    pathname: `/edit/remocons/${remoconId}/widgets/create/input`,
                                    state: {
                                        selectPosition: index
                                    }
                                }}
                                size="large"
                            >
                                ＋追加
                            </Button>
                        }
                    </Grid>
                ))}
            </>
        );
    };

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
                {apiState === "success" && typeof remocon !== "undefined" && remocon !== null && (
                    <>
                        <Typography className={classes.remoconTitle} variant="h5">{remocon.name}</Typography>
                        <Typography variant="caption" color="textSecondary">
                            表示優先度({remocon.priority}) ウィジェットの数({remocon.widgets.length})
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
                                    <EditIcon className={classes.icon} />{"編集"}
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    to={{
                                        pathname: `/edit/remocons/${remoconId}/delete/confirm`,
                                        state: {
                                            inputRemoconName: remocon.name,
                                            inputRemoconPriority: remocon.priority,
                                            widgetCount: remocon.widgets.length
                                        }
                                    }}
                                    component={Link}
                                >
                                    <DeleteIcon className={classes.icon} />{"削除"}
                                </Button>
                            </Grid>
                        </Grid>
                        <Divider className={classes.divider} />
                        <Typography variant="body1">{remocon.name}のウィジェット</Typography>
                        <Grid container spacing={1} className={classes.editButtonsGrid}>
                            <Grid item xs={6}>
                                <Button className={classes.button} variant="contained" color="primary" size="large">
                                    <ViewModuleIcon className={classes.icon} />{"レイアウト"}
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    component={Link}
                                    to={`/edit/remocons/${remoconId}/widgets/create/input`}
                                >
                                    <DeleteIcon className={classes.icon} />{"全削除"}
                                </Button>
                            </Grid>
                        </Grid>
                        <Divider className={classes.divider} />
                        <Typography variant="body1">ウィジェット一覧</Typography>
                        <Typography variant="caption" color="textSecondary">
                            選択してウィジェット編集へ
                        </Typography>
                        <Grid container spacing={1} className={classes.editButtonsGrid}>
                            <Widgets {...props} />
                        </Grid>
                    </>
                )}
            </Container>
        </>
    );
}

export default RemoconDetail;
