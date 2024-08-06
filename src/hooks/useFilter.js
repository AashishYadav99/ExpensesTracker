import { useState } from "react";

export function useFilter(dataList, callbackFunction) {
  const [query, setQuery] = useState("");
  const filteredData = dataList.filter((data) =>
    callbackFunction(data).toLowerCase().includes(query)
  );
  return [filteredData, setQuery];
}
