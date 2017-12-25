import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink } from 'react-router-dom'
import * as Models from "../Models"


async function loadActor(id: number): Promise<Models.Actor> {
    let res = await fetch(`Actors/GetActor/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } })
    let res1 = await res.json()
    return res1
}

export class ActorRoute extends React.Component<RouteComponentProps<{ preview: any, actor: any }>, { actor: Models.Actor | "loading" }> {
    constructor(props: RouteComponentProps<{ preview: boolean, actor: number }>) {
        super(props)
        console.log("props", props)
        this.state = { actor: "loading" }
    }
    componentWillMount() {
        loadActor(this.props.match.params.actor).then(a => this.setState({ ...this.state, actor: a }))
    }
    public render() {
        if (this.state.actor == "loading") return <div>Loading</div>
        return <Actor preview={this.props.match.params.preview == 'true'} actor={this.state.actor} />
    }
}

export class Actor extends React.Component<{ preview: boolean, actor: Models.Actor }, {}>{
    constructor(props: { preview: boolean, actor: Models.Actor }) {
        super(props)
        console.log("props1", props)
        this.state = {}
    }
    public render() {
        if (this.props.preview) {
            return <div> {this.props.actor.name}</div>
        }
        else {
            return <div>
                <div> Actor name: {this.props.actor.name} </div>
            </div>
        }
    }
}