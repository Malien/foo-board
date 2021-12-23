// import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { reorder, retrieveData } from "./persistance";

// React beautiful DnD breaks on React 18 concurrent rendering mode with strict
// mode enabled (which now includes strict effects constraint). React beautiful
// Dnd is no longer actively maintained, but it still is the fastest way to
// develop DnD lists. I've opened an issue, hoping to land a fix, at
// https://github.com/atlassian/react-beautiful-dnd/issues/2350

(async () => {
  const { boards, cards } = await retrieveData();

  ReactDOM.createRoot(document.getElementById("root")!).render(
    //<React.StrictMode>
    <App boards={boards} initialCards={cards} persistReorder={reorder} />
    //</React.StrictMode>
  );
})();
