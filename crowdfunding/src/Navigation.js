import React from "react";
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom';
import './Navigation.css';
import {Header} from "semantic-ui-react";
import HomePage from "./pages/home/HomePage";
import DetailPage from "./pages/detail/DetailPage";
import UserPage from "./pages/user/UserPage";

export default class Navigation extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
        return(
            <BrowserRouter>
                <div className={"boxTitle"}>
                    <Header as='h1' color='purple' className={"txtTitle"}>
                        区块链众筹平台
                    </Header>
                    <Header size='medium' color='purple' className={"txtSecTitle"}>--以链之力，众助而筹</Header>
                </div>
                <hr/>
                <div className={"Navigation"}>
                    <Link to="/home">首页</Link>&nbsp;&nbsp;
                    <Link to="/detail">项目</Link>&nbsp;&nbsp;
                    <Link to="/user">个人中心</Link>
                </div>
                <hr/>
                <Route path="/home" component={HomePage}/>
                <Route path="/detail" component={DetailPage}/>
                <Route path="/user" component={UserPage}/>
                <Redirect to="/home" from="/"/>
            </BrowserRouter>
        )
    }
}