import React, { Component } from "react";
import axios from "axios";

// Components
import BookTable from "./BookTable";
import Loading from "./Loading";

import bookStore from "./stores/bookStore";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class AuthorDetail extends Component {
  state = {
    author: null,
    loading: true
  };

  componentDidMount() {
    this.getAuthor();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.authorID !== this.props.match.params.authorID) {
      this.getAuthor();
    }
  }

  getAuthor = async () => {
    const authorID = this.props.match.params.authorID;
    this.setState({ loading: true });
    try {
      const res = await instance.get(`/api/authors/${authorID}`);
      const author = res.data;
      this.setState({ author: author, loading: false });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      const author = this.state.author;
      const authorName = `${author.first_name} ${author.last_name}`;
      return (
        <div className="author">
          <div>
            <h3>{authorName}</h3>
            <img
              src={author.imageUrl}
              className="img-thumbnail img-fluid"
              alt={authorName}
            />
          </div>
          <BookTable store={bookStore} books={bookStore.booksByAuthor(author)} />
        </div>
      );
    }
  }
}

export default AuthorDetail;
