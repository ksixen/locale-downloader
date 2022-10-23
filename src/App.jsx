import React, { useCallback, useEffect, useState } from "react";
import { PORT } from "../const.js";

const App = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false)
  const urlRegex = /https:\/\/[\w.]*\/[0-9A-Z-a-z-_\/]+(\.\w*)/
  const getUrl = useCallback(() => {
    if(!urlRegex.test(url)) {
      setError(true)
      return false
    }
    setError(false)
    fetch(
      `${String(document.location.href).replace(
        document.location.port,
        String(PORT)
      )}downloadUrl?url=${url}`
    );
  }, [url]);
  return (
    <label>
      {
        error && "ERRRRORR LINK!"
      }
      <input
        style={{
          padding: "10px",
        }}
        value={url}
        onPaste={(e) => {
          if (typeof e.clipboardData === "string" && urlRegex.test(e.clipboardData)) {
            setUrl(e)
          }
        }}
        onChange={(tar) => setUrl(tar?.target?.value)}
      />
      <input type="submit" onClick={getUrl} />
    </label>
  );
};

export default App;
