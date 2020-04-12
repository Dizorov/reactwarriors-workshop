import React from "react";
import classNames from "classnames";
class MovieTabs extends React.Component {
  // UNSAFE_componentWillReceiveProps(nextProps, nextState) {
  //   console.log(nextProps.sort_by);
  // }
  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.sort_by !== this.props.sort_by) {
  //     return true;
  //   }
  //   return false;
  // }
  render() {
    const { sort_by, updateSortBy } = this.props;

    const handleClick = value => () => {
      updateSortBy(value);
    };

    const classes = value => {
      return classNames("nav-link", { active: sort_by === value });
    };
    return (
      <ul className="tabs nav nav-pills">
        <li className="nav-item">
          <div
            className={classes("popularity.desc")}
            onClick={handleClick("popularity.desc")}
          >
            Popularity desc
          </div>
        </li>
        <li className="nav-item">
          <div
            className={classes("revenue.desc")}
            onClick={handleClick("revenue.desc")}
          >
            Revenue desc
          </div>
        </li>
        <li className="nav-item">
          <div
            className={classes("vote_average.desc")}
            onClick={handleClick("vote_average.desc")}
          >
            Average desc
          </div>
        </li>
      </ul>
    );
  }
}

export default MovieTabs;
