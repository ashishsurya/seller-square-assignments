import readline from "readline"
import axios from "axios"
import { MongoClient } from "mongodb";
const GOOGLE_API_KEY = "AIzaSyD9mMae54_zS42zM3RfXi4uu11hgs_8KQA"
const MONGO_CONNECTION_STRING = "mongodb://localhost:27017"

const client = new MongoClient(MONGO_CONNECTION_STRING, { useUnifiedTopology: true, useNewUrlParser: true });
await client.connect();

const db = client.db();
const favouriteBooks = db.collection("favourite_books");


const searchBooks = async (slug) => {
  // TODO: Implement this function.
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${slug}&key=${GOOGLE_API_KEY}`)
    const api_response = response.data;


    const { items: books } = api_response;
    return books
  } catch (e) {
    console.error(e);
    csonsole.log("Error occured while fetching books from API.")
  }
}



const addToFavorites = async (book) => {
  // TODO: Implement this function.
  try {


    favouriteBooks.insertOne(book);
    console.log("Book added to favourites successfully.")
  } catch (e) {
    console.error(e);
    console.log("Error occured while saving book to favourites.")
  }

}


const showFavorites = async () => {
  try {

    const books = await favouriteBooks.find().toArray();
    console.log("🚀 Favourite Books : ");
    books.forEach((book, index) => {
      const { title, authors, publisher } = book.volumeInfo;
      console.log(`${index + 1}. ${title} - ${authors.join(", ")} - ${publisher}`)
    })

  } catch (e) {
    console.error(e);
    console.log("Error occured while fetching books from favourites.")
  }
}


const main = async () => {
  const slug = process.argv.slice(2).join(" ")

  if (slug === "listbooks") {
    await showFavorites();
  } else {
    // No slug provided by user.
    if (!slug) {
      console.log("Please provide a search term.")
      return;
    }


    const books = await searchBooks(slug) ?? [];

    // No books found from API
    if (books.length === 0) {
      console.log("No books found.")
      return;
    }



    console.log("🚀 Search Results : ");
    books.forEach((book, index) => {
      const { title, authors, publisher } = book.volumeInfo;
      console.log(`${index + 1}. ${title} - ${authors.join(", ")} - ${publisher}`)
    })

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    let searchQuery = "";

    while (searchQuery !== "exit") {
      searchQuery = await new Promise((resolve) => {
        rl.question("Enter a book number to add to favorites or type 'exit' to quit: ", (answer) => {
          resolve(answer);
        })
      })

      searchQuery.trim();
      if (searchQuery === "exit") {
        rl.close();
        break;
      }

      const bookIndex = parseInt(searchQuery) - 1;
      const book = books[bookIndex];

      if (book) {
        await addToFavorites(book);
      }
    }
  }



  client.close()

}



main()
