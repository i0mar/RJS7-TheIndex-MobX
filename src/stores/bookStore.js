import { decorate, observable, computed } from "mobx";
import axios from "axios";

const instance = axios.create({
    baseURL: "https://the-index-api.herokuapp.com"
});

class BookStore {
    books = [];
    loading = true;
    query = "";
    color = "";

    fetchBooks = async () => {
        try {
            const books = await instance.get("/api/books/");
            this.books = books.data;
            this.loading = false;
        } catch (error) {
            console.error(error);
        }
    };

    borrowBook = (book) => {
        this.books.find(el => el === book).available = !this.books.find(el => el === book).available;
    };

    booksByAuthor = (author) => {
        const authorBooksIDs = author.books.map(book => book.id);
        return this.books.filter(book => authorBooksIDs.includes(book.id));
    };

    // get filterBooksByColor() {
    //     return this.books.filter(book => book.color === this.color);
    // }

    get filteredBooks() {
        let newBooks = [];
        if (this.color) {
            newBooks = this.books.filter(book => book.color === this.color && book.title.toUpperCase().includes(this.query.toUpperCase()));
        } else {
            newBooks = this.books.filter(book => book.title.toUpperCase().includes(this.query.toUpperCase()));
        }

        console.log(newBooks);

        return newBooks;
    };
}

decorate(BookStore, {
    books: observable,
    loading: observable,
    query: observable,
    color: observable,
    filteredBooks: computed
    // filterBooksByColor: computed
});

const bookStore = new BookStore();
bookStore.fetchBooks();

export default bookStore;