// import * as React from "react";
// import { Link } from "react-router-dom";
// import { Toast } from "../util/toast";
// import AuthUser from "./AuthUser";
// import PropTypes from "prop-types";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import MenuIcon from "@mui/icons-material/Menu";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import "./style.css";
// import { useState } from "react";

// const drawerWidth = 240;

// function DrawerAppBar(props) {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const drawer = (
//     <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
//       <Typography variant="h6" sx={{ my: 2 }}>
//         MUI
//       </Typography>
//       <Divider />
//       <List></List>
//     </Box>
//   );

//   const container =
//     window !== undefined ? () => window().document.body : undefined;
//   const { logout, token } = AuthUser();

//   const logOut = () => {
//     if (token !== undefined) {
//       logout();
//       Toast.fire({
//         icon: "success",
//         title: "Logout successfully",
//       });
//     }
//   };
//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <AppBar component="nav" color="inherit" className="Navbar">
//         <Toolbar>
//           <IconButton
//             color="primary"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: "none" } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
//           >
//             Projects
//           </Typography>

//           <Box sx={{ width: "100%" }}>
//             <Tabs
//               value={value}
//               onChange={handleChange}
//               aria-label="nav tabs example"
//             >
//               {/*<Tab component={Link} label="Project" to="/project" />*/}
//               {/*<Tab component={Link} label="AddProject" to="/add-project" />*/}
//             </Tabs>
//           </Box>
//           <Button onClick={logOut()}>Logout</Button>
//         </Toolbar>
//       </AppBar>
//       <Box component="nav">
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//           sx={{
//             display: { xs: "block", sm: "none" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//       <Box component="main" sx={{ p: 3 }}>
//         <Toolbar />
//       </Box>
//     </Box>
//   );
// }

// DrawerAppBar.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };

// export default DrawerAppBar;
