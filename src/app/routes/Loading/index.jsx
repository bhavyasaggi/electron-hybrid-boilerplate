import React from "react";

export default function LoadingRoute({ code, message }) {
  return (
    <pre>
      LOADING: {code} : {message}
    </pre>
  );
}
