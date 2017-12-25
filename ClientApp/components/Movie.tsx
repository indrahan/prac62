import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom'
import * as Models from "../Models"
import { Actor } from "./Actor"

async function loadMovie(id: number): Promise<Models.Movie> {
    let res = await fetch(`./Movies/GetMovie/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } })
    let res1 = await res.json()
    return res1
}
export class MovieRoute extends React.Component<RouteComponentProps<{ preview: any, movie: any }>, { movie: Models.Movie | "loading" }> {
    constructor(props: RouteComponentProps<{ preview: boolean, movie: number }>) {
        super(props)
        this.state = { movie: "loading" }
    }
    componentWillMount() {
        loadMovie(this.props.match.params.movie).then(m => this.setState({ ...this.state, movie: m }))
    }
    public render() {
        if (this.state.movie == "loading") return <div>Loading...</div>
        return <Movie preview={this.props.match.params.preview == 'true'} movie={this.state.movie} />
    }
}

export class Movie extends React.Component<{ preview: boolean, movie: Models.Movie }, {}> {
    constructor(props: { preview: boolean, movie: Models.Movie }) {
        super(props)
        this.state = {}
    }

    public render() {
        if (this.props.preview) {
            return <div> {this.props.movie.title} </div>
        }
        else {
            return <div>
                <div> Movie title: {this.props.movie.title} </div>
                <div> Movie genre: {this.props.movie.genre} </div>
                <div className="movie-actors">
                    {this.props.movie.actors.map(a => <div className="movie-actors-actor">
                        <Actor actor={a} preview={true} />
                        <Link to={"/actor/false/" + a.id}>
                            <button>Expand actor</button>
                        </Link>
                    </div>)}
                </div>
            </div>
        }
    }
}
