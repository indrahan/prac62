import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink } from 'react-router-dom'
import * as Models from "../Models"
import { Button } from 'react-bootstrap';


async function loadActor(id: number): Promise<Models.Lecture> {
    let res = await fetch(`Lectures/GetLecture/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } })
    let res1 = await res.json()
    return res1
}

export class LectureRoute extends React.Component<RouteComponentProps<{ preview: any, lecture: any }>, { lecture: Models.Lecture | "loading" }> {
    constructor(props: RouteComponentProps<{ preview: boolean, lecture: number }>) {
        super(props)
        console.log("props", props)
        this.state = { lecture: "loading" }
    }
    componentWillMount() {
        loadActor(this.props.match.params.lecture).then(l => this.setState({ ...this.state, lecture: l }))
    }
    public render() {
        if (this.state.lecture == "loading") return <div>Loading</div>
        return <Lecture preview={this.props.match.params.preview == 'true'} lecture={this.state.lecture} />
    }
}

export class Lecture extends React.Component<{ preview: boolean, lecture: Models.Lecture }, {}>{
    constructor(props: { preview: boolean, lecture: Models.Lecture }) {
        super(props)
        console.log("props1", props)
        this.state = {}
    }
    public render() {
        if (this.props.preview) {
            return <div> {this.props.lecture.lectureCode}</div>
        }
        else {
            return <div>
                <div>
                    <h4><strong>Lecture topic:</strong></h4>
                    {this.props.lecture.lectureCode} </div>
                <div>
                    <h4><strong>Teacher:</strong></h4>
                    {this.props.lecture.teacher}
                </div>

            </div>
        }
    }
}