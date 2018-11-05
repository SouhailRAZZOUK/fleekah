import React from "react";
import MaterialIcon from '@material/react-material-icon';
import { Link } from "react-router-dom";

const homeIcon = <Link to="/"><MaterialIcon key='item' icon='home' /></Link>
const mapIcon = <Link to="/map"><MaterialIcon key='item' icon='map' /></Link>
const searchIcon = <Link to="/searchByColors"><MaterialIcon key='item' icon='search' /></Link>

const home = [mapIcon, searchIcon];
const search = [homeIcon, mapIcon];
const map = [homeIcon, searchIcon];
const all = [homeIcon, mapIcon, searchIcon]

export const TopBarActionsTypes = {
    home,
    search,
    map,
    all
}