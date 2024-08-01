'use client'

import { useState, useEffect } from 'react';
import { Input } from '@nextui-org/input'; 
import { SearchIcon } from '../components/icons';
import { title, subtitle, } from "@/components/primitives";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import "./styles.css";

interface Game {
  id: string;
  name: string;
  released: string;
  background_image: string;
}

const Home = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Game[]>([]);

  useEffect(() => {
    if (query.length > 0) {
      fetch(`http://localhost:5000/api/search?query=${query}`)
        .then(res => res.json())
        .then(data => setResults(data.results || []))
        .catch(error => console.error('Error fetching data:', error));
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    
    <section className="flex flex-col gap-4 py-8 md:py-10">
      <div className="inline-block text-left">
      <div className="flex flex-col">
      <h1 className={title()} style={{marginTop: "40px",fontSize:"6em"}}>Game&nbsp;</h1>
        <h1 className={title({ color: "violet" })} style={{fontSize:"6em"}}>Search &nbsp;</h1>
        </div>
        <br />
        <h2 className={subtitle({ class: "mt-6" })}>
        Search on a million of videogames.
        </h2>
        <Input

          aria-label="Search"
          classNames={{
            inputWrapper: "bg-default-100 custom-input",
            input: "text-sm",
          }}
          labelPlacement="outside"
          placeholder="Search games..."
          startContent={
            <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0 ml-1 mr-2" />
          }
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map(game => (
            <Card key={game.id} className="py-4">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">{game.released}</p>
                <h4 className="font-bold text-large">{game.name}</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt={game.name}
                  className="object-cover rounded-xl h-56 w-96"
                  src={game.background_image}
                  width={270}
                />
              </CardBody>
            </Card>
          ))}
        </div>
        </div>
        
    </section>
  );
};

export default Home;
