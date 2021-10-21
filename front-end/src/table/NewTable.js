import React from "react";
import TableForm from "./TableForm";

function NewTable() {
  return (
    <div>
      <h1 className="d-flex justify-content-center my-3">Create a new table</h1>
      <TableForm />
    </div>
  );
}

export default NewTable;