import Link from "next/link";
import News from "../../components/news";
import { nanoid } from "nanoid";

export type Archive = {
  year: string;
  localisation: {
    city: string;
    country: string;
    airline: string;
    airport: string;
  };
};

type Path = {
  params: {
    year: string;
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(
    `https://63a506182a73744b0083dd39.mockapi.io/archives`
  );
  const archives: Archive[] = await res.json();
  let paths: Path[] = [];

  archives.map((archive) => {
    let addYear = true;
    paths.forEach((path) => {
      if (path.params.year === archive.year) {
        addYear = false;
      }
    });
    if (addYear) {
      paths.push({
        params: {
          year: archive.year,
        },
      });
    }
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const { params } = context;
  const res = await fetch(
    `https://63a506182a73744b0083dd39.mockapi.io/archives?search=${params.year}`
  );
  const archives: Archive[] = await res.json();

  return {
    props: {
      archives,
      year: params.year,
    },
  };
};

type Props = {
  archives: Archive[];
  year: string;
};

const Archives = (props: Props) => {
  return (
    <div>
      <button>
        <Link href="/archives/">Back to Archives</Link>
      </button>
      <p>Archives of year {props.year} </p>
      <div>
        <ul>
          {props.archives.map((archive: Archive) => (
            <News key={nanoid()} {...archive}></News>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Archives;
