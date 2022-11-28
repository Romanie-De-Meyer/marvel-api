import "./index.css";

const Home = () => {
  return (
    <>
      <div id="first-block">
        <span className="title-page" id="comics">
          comics
        </span>
        <div id="text-flash">
          <svg
            id="flash"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="BoltIcon"
          >
            <path
              d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"
              fill="#ffe0a3"
            ></path>
          </svg>
          <p id="text">bring your childhood back</p>
        </div>
      </div>
      <div>
        <span className="title-page" id="book">
          book
        </span>
      </div>
    </>
  );
};

export default Home;
