const MovieSearchInput = (props: any) => {
  return (
    <div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Search For a movie{" "}
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Movie"
          aria-label="Movie"
          aria-describedby="basic-addon1"
          onChange={props.onChange}
          id={props.id}
          onKeyDown={props.searchForMovie}
        />
      </div>
    </div>
  );
};

export default MovieSearchInput;
