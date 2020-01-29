import React, { useState, Fragment } from 'react';
import { makeStyles, Container, List, Divider, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';

import db from "../../../firebase";
import { Link } from 'react-router-dom';
import ConnectingScene from '../../../components/ConnectingScene';
import ErrorScene from '../../../components/ErrorScene';


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
    const [storeConState, setStoreConState] = React.useState<"connecting" | "error" | "success">("connecting");
    const [remocons, setRemocons] = useState([]);

    React.useEffect(() => {
        props.changePage(30001);
        db.get().then(s => {
            setTimeout(() => {
                let newRemocons: any = [];
                s.forEach(d => {
                    newRemocons.push({ id: d.id, ...d.data() });
                })
                setRemocons(newRemocons);
                setStoreConState("success");
            }, 500);
        }).catch(error => {
            setStoreConState("error");
        });
    }, []);

    return (
        <>
            <Container className={classes.container}>
                {storeConState === "connecting" && (
                    <ConnectingScene text={""} {...props} />
                )}
                {storeConState === "error" && (
                    <ErrorScene
                        text="通信に失敗しました"
                        path={`/edit`}
                        btnText="設定画面へ"
                        {...props}
                    />
                )}
                {storeConState === "success" && (
                <List>
                    <Divider />
                    {remocons.map((remocon: any, index: any) => (
                        <React.Fragment key={index} >
                            <ListItem alignItems="flex-start" button component={Link} to={"/store/" + remocon.id}>
                                <ListItemText
                                    primary={remocon.name}
                                    secondary={remocon.description}
                                />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
                )}
            </Container>
        </>
    );
}

export default Store;
