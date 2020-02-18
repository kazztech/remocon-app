import React, { useState, Fragment, useEffect } from "react";
import {
  makeStyles,
  Container,
  List,
  Divider,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  Typography,
  Fab,
  Box,
  createPalette
} from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import db from "../../../firebase";
import { Link } from "react-router-dom";
import ConnectingScene from "../../../components/ConnectingScene";
import ErrorScene from "../../../components/ErrorScene";
import { red } from "@material-ui/core/colors";

const styles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2)
  },
  inputArea: {
    width: "calc(100% - 20px)",
    position: "fixed",
    top: 72,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10000,
    backgroundColor: theme.palette.background.default
  },
  resultContainer: {
    marginTop: 62,
    marginBottom: 64
  }
}));

interface StoreProps {
  changePage(id: number): void;
}
const Store: React.FC<StoreProps> = (props: StoreProps) => {
  const classes = styles();
  const [storeConState, setStoreConState] = React.useState<
    "connecting" | "error" | "success"
  >("connecting");
  const [remocons, setRemocons] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [isSearchBusy, setIsSearchBusy] = useState(false);
  const [timeoutId, setTimeoutId] = useState<any>(0);

  React.useEffect(() => {
    props.changePage(30001);
  }, []);

  useEffect(() => {
    if (isSearchBusy) {
      clearTimeout(timeoutId);
    }
    setIsSearchBusy(true);
    setTimeoutId(
      setTimeout(() => {
        setStoreConState("connecting");
        db.orderBy("productId")
          .startAt(searchText)
          .endAt(`${searchText}\uf8ff`)
          .limit(20)
          .get()
          .then(s => {
            setTimeout(() => {
              let newRemocons: any = [];
              s.forEach(d => {
                newRemocons.push({ id: d.id, ...d.data() });
              });
              setRemocons(newRemocons);
              setIsSearchBusy(false);
              setStoreConState("success");
            }, 1000);
          })
          .catch(error => {
            setStoreConState("error");
          });
      }, 500)
    );
  }, [searchText]);

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
        {storeConState !== "error" && (
          <>
            <TextField
              className={classes.inputArea}
              label="型番やキーワード"
              variant="outlined"
              value={searchText}
              onChange={e => {
                setSearchText(e.target.value);
              }}
              fullWidth
            />
            <Fab
              variant="extended"
              color="primary"
              component={Link}
              to={`/store/upload/select`}
              style={{
                width: "calc(100% - 20px)",
                position: "fixed",
                bottom: 72,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 10000
              }}
            >
              <PublishIcon /> アップロード
            </Fab>
          </>
        )}
        {storeConState === "success" && (
          <>
            <Box className={classes.resultContainer}>
              <List style={{ marginBottom: 64 }}>
                <Divider />
                {remocons.map((remocon: any, index: any) => (
                  <React.Fragment key={index}>
                    <ListItem
                      alignItems="flex-start"
                      button
                      component={Link}
                      to={"/store/" + remocon.id}
                    >
                      <ListItemText
                        primary={remocon.productId}
                        secondary={remocon.description}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
                {remocons.length === 0 && (
                  <Typography
                    variant="body2"
                    style={{ textAlign: "center", marginTop: 24 }}
                  >
                    一致するリモコンが見つかりませんでした
                  </Typography>
                )}
              </List>
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export default Store;
