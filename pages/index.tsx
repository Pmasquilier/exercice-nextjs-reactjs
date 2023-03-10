import Head from "next/head";
import styles from "../styles/Home.module.css";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Link from "next/link";
import { GetStaticProps } from "next";
import News from "../components/news";

export type New = {
  time: {
    t_begin: number;
    t_end: number;
  };
  localisation: {
    city: string;
    country: string;
    airline: string;
    airport: string;
  };
};

type Filters = {
  airports: string[];
  countries: string[];
  airlines: string[];
};

type Props = {
  news: New[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const response = await fetch(
    `https://63a506182a73744b0083dd39.mockapi.io/news`
  );
  const news = await response.json();

  return {
    props: {
      news,
    },
  };
};

export default function Home(props: Props) {
  const [filterNews, setFilterNews] = useState<New[]>([]);
  const [filters, setFilters] = useState<Filters>({
    airports: [],
    countries: [],
    airlines: [],
  });

  useEffect(() => {
    const applyFiltersToNews = (props: Props) => {
      return props.news.filter((article) => {
        if (
          filters.airports.length &&
          !filters.airports.includes(article.localisation.airport)
        ) {
          return false;
        }
        if (
          filters.countries.length &&
          !filters.countries.includes(article.localisation.country)
        ) {
          return false;
        }
        if (
          filters.airlines.length &&
          !filters.airlines.includes(article.localisation.airline)
        ) {
          return false;
        }
        return true;
      });
    };
    setFilterNews(applyFiltersToNews(props));
  }, [filters, props]);

  const handleFilterChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <>
      <Head>
        <title>Exercice ReactJS NextJS</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <button>
            <Link href="/archives">See Archives</Link>
          </button>
          <div>
            <label htmlFor="airports">filtrate by airport: </label>
            <select name="airports" id="airports" onChange={handleFilterChange}>
              <option value="">---</option>
              <option value="London Heathrow Airport">
                London Heathrow Airport
              </option>
              <option value="Paris Charles de Gaulle Airport">
                Paris Charles de Gaulle Airport
              </option>
              <option value="Frankfurt International Airport">
                Frankfurt International Airport
              </option>
              <option value="Belfast International Airport">
                Belfast International Airport
              </option>
              <option value="Airport Marseille Provence">
                Airport Marseille Provence
              </option>
              <option value="Airport Willy-Brandt Berlin-Brandebourg">
                Airport Willy-Brandt Berlin-Brandebourg
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="countries">filtrate by country: </label>
            <select
              name="countries"
              id="countries"
              onChange={handleFilterChange}
            >
              <option value="">---</option>
              <option value="England">England</option>
              <option value="France">France</option>
              <option value="Deutschland">Deutschland</option>
            </select>
          </div>

          <div>
            <label htmlFor="airlines">filtrate by airport: </label>
            <select name="airlines" id="airlines" onChange={handleFilterChange}>
              <option value="">---</option>
              <option value="British Airways">British Airways</option>
              <option value="Air France">Air France</option>
              <option value="Eurowings">Eurowings</option>
              <option value="Eurowings">Ryanair</option>
              <option value="Eurowings">Eastern Airways</option>
            </select>
          </div>
        </div>

        <div>
          <ul>
            {filterNews.map((filterNew: New) => (
              <News key={nanoid()} {...filterNew}></News>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
