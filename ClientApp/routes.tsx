import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { MoviesManager } from './components/MoviesManager';
import { ActorsManager } from './components/ActorsComponent';
import { ActorRoute } from './components/Actor';
import { MovieRoute } from './components/Movie';

//export let path = "http://localhost:5000"
export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={ FetchData } />
    <Route path='/moviesmanager' component ={MoviesManager} />
    <Route path='/actorsmanager' component ={ActorsManager} />
    <Route path='/actor/:preview/:actor' component ={ActorRoute} />
    <Route path='/movie/:preview/:movie' component ={MovieRoute} />
</Layout>;
