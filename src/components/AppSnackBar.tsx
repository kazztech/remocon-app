import React from 'react';
// import { makeStyles, Container, CircularProgress, IconButton, Snackbar } from '@material-ui/core';
// import CloseIcon from "@material-ui/icons/Close"

// const styles = makeStyles(theme => ({
//     connectingText: {
//         marginTop: theme.spacing(1)
//     }
// }));

// // TODO:::::::::::::::::::

// interface ConnectingSceneProps {
//     open: boolean;
// };
// const ConnectingScene: React.FC<ConnectingSceneProps> = (props: ConnectingSceneProps) => {
//     const classes = styles();
    
//     const SnackBarState = {
//         show: false,
//         text: "",
//         timeout: 3000
//     };
    
//     const SnackBarContext = React.createContext(SnackBarState);

//     return (
//         <>
//             <Snackbar
//                     style={{ marginBottom: 56 }}
//                     message={"本体機器と接続ができませんでした"}
//                     open={snackIsOpen}
//                     onClose={() => { setSnackIsOpen(true) }}
//                     action={[
//                         <IconButton
//                             key="close"
//                             aria-label="close"
//                             color="inherit"
//                             onClick={() => { setSnackIsOpen(false) }}
//                         >
//                             <CloseIcon />
//                         </IconButton>,
//                     ]}
//                 />
//         </>
//     );
// }

// export default ConnectingScene;
