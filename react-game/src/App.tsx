import React, { useEffect, useState } from "react";
import "./App.css";
import Game from "./Components/game/Game";
import { Route, Switch } from 'react-router-dom';
import FandomMenu from "./pages/FandomMenu/FandomMenu";

export default function App() {
  localStorage.removeItem('Start');
  return (
    <>
      {/* <Game /> */}
      <Switch>
          <Route path="/Game" component={Game} />
          <Route exact path="/" component={FandomMenu}/>
          {/* <Route path="/articles/:categoryId" component={ArticlesPage}/>
          <Route path="/article/:articleId" component={ArticlePage} />
          <Route path="/login" component={LoginPage} /> */}
      </Switch>

    </>
  )
}
