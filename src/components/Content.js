import React from "react";
import Markdown from "react-markdown";

export default function Content(props) {
  if (props.err) {
    return <div>500 server error</div>;
  } else if (props.question) {
    return <Markdown source={props.question} className="markdown" />;
  } else if (props.output) {
    return null;
  }
}
