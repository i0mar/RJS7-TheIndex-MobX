import React, { Component } from "react";
import axios from "axios";

// Components
import Loading from "./Loading";
import SearchBar from "./SearchBar";
import BookTable from "./BookTable";

import bookStore from "./stores/bookStore";
import { observer } from "mobx-react";

class BookList extends Component {
  bookColor = this.props.match.params.bookColor;

  componentDidMount() {
    if (this.bookColor)
      bookStore.color = this.bookColor;
  };

  componentDidUpdate(prevProps) { 
    this.bookColor = this.props.match.params.bookColor;

    if (prevProps.match.params.bookColor !== this.props.match.params.bookColor)
      bookStore.color = this.bookColor;
  };

  render() {
    let books = bookStore.filteredBooks;

    return bookStore.loading ? (
      <Loading />
    ) : (
      <div>
        <h3>Books</h3>
        <SearchBar store={bookStore} />
        <BookTable store={bookStore} books={books} />
      </div>
    );
  }
}

export default observer(BookList);
