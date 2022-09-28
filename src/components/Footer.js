import React from "react";
import { useLocation } from "react-router-dom";

export default function Footer({ handleSaveNSkip }) {
  let currentPath = useLocation().pathname;
  return (
    <div className="footer-wrap">
      {currentPath !== "/" && (
        <button type="button" className="button outline">
          Back
        </button>
      )}
      {currentPath === "/" && (
        <button type="button" className="button grey" onClick={handleSaveNSkip}>
          Save & Skip
        </button>
      )}
      <button type="submit" className="button">
        Continue ➩
      </button>
    </div>
  );
}
