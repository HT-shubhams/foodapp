import { useEffect, useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("pizza");
  //   Syntax of useEffect hook
  //   useEffect(() => {}, []);
  useEffect(() => {
    function demo() {
      console.log("sda");
    }
    demo();
  }, [query]);
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
