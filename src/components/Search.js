import React from 'react'
import {Search, SearchIconWrapper, InputBase} from "@mui/material"
import { styled,alpha } from '@mui/material/styles';


const Search = styled("div")(({theme})=>({
    position: "relative",
    borderRadius: 20,
    backgroundColor:alpha(theme.palette.background.paper,1),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
}));
const SearchIconWrapper = styled("div")(({theme})=>({
    padding: theme.spacing(0,2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));
const StyledInputBase = styled("div")(({theme})=>({
    color: "inherit",
    "& .MuiInputBase-input":{
        padding: theme.spacing(1,1,1,0), 
        paddingLeft: `calc(len + ${theme.spacing(4)})`,
        width: "100%",
    },
}));


export default Search