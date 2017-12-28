import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { CoursesManager } from './components/CoursesManager';
import { LecturesManager } from './components/LecturesManager';
import { LectureRoute } from './components/Lecture';
import { CourseRoute } from './components/Course';

//export let path = "http://localhost:5000"
export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={ FetchData } />
    <Route path='/coursesmanager' component ={CoursesManager} />
    <Route path='/lecturesmanager' component ={LecturesManager} />
    <Route path='/lecture/:preview/:lecture' component ={LectureRoute} />
    <Route path='/course/:preview/:course' component ={CourseRoute} />
</Layout>;
