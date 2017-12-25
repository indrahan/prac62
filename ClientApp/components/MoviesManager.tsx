import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../Models"
import { Actor } from "./Actor"

 async function loadMovies(): Promise<Models.Movie[]> {
     let res = await fetch('./Movies/GetAll', { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } })
     let res1 = await res.json()
     return res1
 }

export class MoviesManager extends React.Component<RouteComponentProps<{}>, { movies: Models.Movie[] | "loading" }>{
    constructor(props: RouteComponentProps<{}>) {
        super(props)
        this.state = { movies: "loading" }
    }
    componentWillMount() {
        loadMovies().then(ms => this.setState({ ...this.state, movies: ms }))
    }
    public render() {
        if (this.state.movies == "loading") return <div>Loading...</div>
        return <div className="movies">
            {this.state.movies.map(m => <div className="movies-movie">
                {m.title}
                <Link to={"/movie/false/" + m.id}>
                    <button>Expand movie</button>
            </Link>
                <div className="movies-movie-actors">
                    {m.actors.map(a => <div className="movies-movie-actors-actor">
                        <Actor actor={a} preview={true}/>
                        <Link to={"/actor/false/" + a.id}>
                            <button>Expand actor</button>
                        </Link>
                    </div>)}
                </div>
            </div>)}
        </div>
    }
}