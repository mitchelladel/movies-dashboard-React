const MovieCard = (props: any) => {
  return (
    <div className="card" onClick={props.onClick}>
      <img src={props.image} alt="" />

      <div className="movie-info">
        {" "}
        <div className="column">
          {props.genres.map((genre: string) => (
            <div className="genre-box">{genre}</div>
          ))}
        </div>
        <div className="column"> {props.rating}</div>
      </div>
    </div>
  );
};

export default MovieCard;
