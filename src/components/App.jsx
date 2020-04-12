import React from "react";
// import { moviesData } from "../moviesData";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../utils/api";
import MovieTabs from "./MovieTabs";
import MoviePages from "./MoviePages";
// UI = fn(state, props)

// App = new React.Component()

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "popularity.desc",
      page: 1,
      total_pages: 0
    };
  }

  componentDidMount() {
    console.log("did mount");
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("did update");
    if (this.state.sort_by !== prevState.sort_by) {
      // console.log("call api");
      this.getMovies();
      this.setState({
        page: 1
      });
    }
  }

  deleteMovie = movie => {
    const updateMovies = this.state.movies.filter(item => item.id !== movie.id);

    // this.state.movies = updateMovies;
    this.setState({
      movies: updateMovies
    });
  };

  addMovieToWillWatch = movie => {
    const updateMoviesWillWatch = [...this.state.moviesWillWatch];
    updateMoviesWillWatch.push(movie);

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  deleteMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(
      item => item.id !== movie.id
    );

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  updateSortBy = value => {
    this.setState({
      sort_by: value
    });
  };

  nextPage = () => {
    if (this.state.page <= this.state.total_pages) {
      this.setState({
        page: this.state.page + 1
      });
      setTimeout(() => {
        this.getMovies();
      }, 0);
    }
  };

  prevPage = () => {
    if (this.state.page !== 1) {
      this.setState({
        page: this.state.page - 1
      });
      setTimeout(() => {
        this.getMovies();
      }, 0);
    }
  };

  getMovies = () => {
    fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${
        this.state.sort_by
      }&page=${this.state.page}`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log(data);
        this.setState({
          movies: data.results,
          total_pages: data.total_pages
        });
        // console.log(this.state);
      });
  };

  render() {
    console.log("render", this.state.page);
    return (
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col-lg-9">
            <div className="mb-4">
              <MovieTabs
                sort_by={this.state.sort_by}
                updateSortBy={this.updateSortBy}
              />
            </div>
            <div className="mb-4">
              <MoviePages
                page={this.state.page}
                total_pages={this.state.total_pages}
                prevPage={this.prevPage}
                nextPage={this.nextPage}
              />
            </div>
            <div className="row">
              {this.state.movies.map(movie => {
                return (
                  <div className="col-sm-6 col-lg-4 mb-4" key={movie.id}>
                    <MovieItem
                      data={movie}
                      deleteMovie={this.deleteMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      deleteMovieFromWillWatch={this.deleteMovieFromWillWatch}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mb-4">
              <MoviePages
                page={this.state.page}
                total_pages={this.state.total_pages}
                prevPage={this.prevPage}
                nextPage={this.nextPage}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <h4>Will Watch: {this.state.moviesWillWatch.length} movies</h4>
            <ul className="list-group">
              {this.state.moviesWillWatch.map(movie => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <p>{movie.title}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
