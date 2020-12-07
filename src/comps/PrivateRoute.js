import React from "react"
import {useUser} from "../context/context"
import {Route, Redirect } from "react-router-dom"

const PrivateRoute = ({component: Component, ...rest}) => {
    const {user} = useUser()
    
    return (<Route {...rest} render={props => user ? (<Component {...props}/>) : (<Redirect to="/signup"/>)}>

    </Route>)
}

export default PrivateRoute