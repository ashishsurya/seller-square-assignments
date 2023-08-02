import axios from "axios"
import { load } from "cheerio"
import { MongoClient } from "mongodb";

const getCountries = async () => {
  try {
    const URL = "https://www.britannica.com/topic/list-of-countries-1993160"
    const response = await axios.get(URL);
    const html = response.data;
    const $ = load(html);


    const countryElements = $("a.md-crosslink");


    let countries = []
    countryElements.each((_, element) => {
      countries.push($(element).text())
    })

    countries.splice(0, 2)

    return countries;
  } catch (e) {
    console.error(e)
    console.log("Not able to scrape the webpage.")
    process.exit(1)
  }
}

const saveCountries = async (countries) => {
  try {
    const CONNECTION_STRING = "mongodb://localhost:27017";
    const client = new MongoClient(CONNECTION_STRING, { useUnifiedTopology: true, useNewUrlParser: true });
    await client.connect();

    const db = client.db();
    const countriesCollection = db.collection("countries");
    await countriesCollection.insertMany(countries.map(x => ({ name: x })));

    console.log("Countries saved successfully.")

    client.close()
  } catch (e) {
    console.error(e)
    console.log("Not able to save the countries.")
    process.exit(1)
  }
}

const countries = await getCountries()
saveCountries(countries)
