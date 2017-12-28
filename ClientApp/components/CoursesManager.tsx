import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../Models"
import { Lecture } from "./Lecture"
import { Button } from 'react-bootstrap';


async function loadCourses(): Promise<Models.Course[]> {
    let res = await fetch('./Courses/GetAll', { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } })
    let res1 = await res.json()
    return res1
}

export class CoursesManager extends React.Component<RouteComponentProps<{}>, { courses: Models.Course[] | "loading" }>{
    constructor(props: RouteComponentProps<{}>) {
        super(props)
        this.state = { courses: "loading" }
    }
    componentWillMount() {
        loadCourses().then(cs => this.setState({ ...this.state, courses: cs }))
    }
    public render() {
        if (this.state.courses == "loading") return <div>Loading...</div>
        return <div className="courses">
            
            
            {this.state.courses.map(c => <div className="courses-course">
                <strong>{c.courseCode}</strong>
                
                <Link to={"/course/false/" + c.id}>
                    <br />
                    <Button bsStyle="primary">Expand course</Button>
                </Link>
                <div className="courses-course-lectures">
                    {c.lectures.map(l => <div className="courses-course-lectures-lecture">
                        <Lecture lecture={l} preview={true} />
                        <Link to={"/lecture/false/" + l.id}>
                            <Button bsStyle="success" bsSize="xsmall">Expand lecture</Button>
                        </Link>

                    </div>)}
                    <br />
                    <br />
                    <br />
                </div>
            </div>)}

        </div>
    }
}