import { clientHomeUrl } from "./App";

export default function ErrorPage(): React.JSX.Element {
  
    return (
      <div>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          Please return to the <a href={clientHomeUrl}>home page and restart.</a>
        </p>
      </div>
    )
  }