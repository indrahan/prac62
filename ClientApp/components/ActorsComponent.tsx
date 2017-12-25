import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom'
import * as Models from "../Models"
import { Actor } from "./Actor"

async function loadActors(): Promise<Models.Actor[]> {
    let res = await fetch('./Actors/GetAll', { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } })
    let res1 = await res.json()
    return res1
}

export class ActorsManager extends React.Component<RouteComponentProps<{}>, { actors: Models.Actor[] | "loading" }> {
    constructor(props: RouteComponentProps<{}>) {
        super(props)
        this.state = { actors: "loading" }
    }
    componentWillMount() {
        loadActors().then(as => this.setState({ ...this.state, actors: as }))
    }
    public render() {
        if (this.state.actors == "loading") return <div>Loading...</div>
        return <div className="actors">
            {this.state.actors.map(a => <div className="actors-actor">
                {<Actor actor={a} preview={true} />}
                <Link to={"/actor/false/" + a.id}>
                    <button>Expand actor</button>
                </Link>
            </div>)}
        </div>
    }
}