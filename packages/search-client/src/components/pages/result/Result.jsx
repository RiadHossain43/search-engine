import React, { useEffect } from "react";

export const Result = ({ result }) => {
  return (
    <div>
      <a href={result.website} target="_blank" rel="noreferrer">
        <p className="text-sm">
          {result.website.length > 40
            ? `${result.website.substring(0, 40)}...`
            : result.website}
        </p>
        <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
          {result.name}
        </p>
        <p className="text-gray-600">{result.description}</p>
      </a>
    </div>
  );
};
