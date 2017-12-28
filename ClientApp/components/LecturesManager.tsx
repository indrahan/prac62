import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom'
import * as Models from "../Models"
import { Lecture } from "./Lecture"

async function loadLectures(): Promise<Models.Lecture[]> {
    let res = await fetch('./Lectures/GetAll', { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } })
    let res1 = await res.json()
    return res1
}

export class LecturesManager extends React.Component<RouteComponentProps<{}>, { lectures: Models.Lecture[] | "loading" }> {
    constructor(props: RouteComponentProps<{}>) {
        super(props)
        this.state = { lectures: "loading" }
    }
    componentWillMount() {
        loadLectures().then(ls => this.setState({ ...this.state, lectures: ls }))
    }
    public render() {
        if (this.state.lectures == "loading") return <div>Loading...</div>
        return <div className="lectures">
            {this.state.lectures.map(l => <div className="lectures-lecture">
                {<Lecture lecture={l} preview={true} />}
                <Link to={"/lecture/false/" + l.id}>
                    <button>Expand lecture</button>
                </Link>
            </div>)}
        </div>
    }
}