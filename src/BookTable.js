import React from "react";

import BookRow from "./BookRow";

function BookTable(props) {
  const bookRows = props.books.map(book => (
    <BookRow store={props.store} key={book.id} book={book} />
  ));
  return (
    <table className="mt-3 table">
      <thead>
        <tr>
          <th />
          <th>Name</th>
          <th>Authors</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>{bookRows}</tbody>
    </table>
  );
}

export default BookTable;
