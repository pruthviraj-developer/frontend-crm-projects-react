/* eslint-disable no-use-before-define */
import React, { FC } from 'react';
import { CarouselCard } from './CarouselCard';
import styled from '@emotion/styled';
import { AutoCompleteOption } from 'auto-complete/IAutoComplete';
export default {
  title: 'Card',
};
const StyledCardCntr = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-flow: row wrap;
  width: 1000px;
  /* font-size: 10; */
  /* width: 500px; */
  /* height: 500px; */
`;

export const Card: FC = () => (
  <StyledCardCntr>
    <CarouselCard autoCopmpleOptions={autoCopmpleOptions} />
  </StyledCardCntr>
);
// export const MultipleCard: FC = () => (
//   <StyledCardCntr>
//     <CarouselCard key="card1" />
//     <CarouselCard key="card2" />
//     <CarouselCard key="card3" />
//     <CarouselCard key="card4" />
//     <CarouselCard key="card5" />
//     <CarouselCard key="card6" />
//   </StyledCardCntr>
// );

const OptionTestData: Array<AutoCompleteOption> = [
  { name: 'The Shawshank Redemption', value: 1994 },
  { name: 'The Godfather', value: 1972 },
  { name: 'The Godfather: Part II', value: 1974 },
  { name: 'The Dark Knight', value: 2008 },
  { name: '12 Angry Men', value: 1957 },
  { name: "Schindler's List", value: 1993 },
  { name: 'Pulp Fiction', value: 1994 },
  { name: 'The Lord of the Rings: The Return of the King', value: 2003 },
  { name: 'The Good, the Bad and the Ugly', value: 1966 },
  { name: 'Fight Club', value: 1999 },
  { name: 'The Lord of the Rings: The Fellowship of the Ring', value: 2001 },
  { name: 'Star Wars: Episode V - The Empire Strikes Back', value: 1980 },
  { name: 'Forrest Gump', value: 1994 },
  { name: 'Inception', value: 2010 },
  { name: 'The Lord of the Rings: The Two Towers', value: 2002 },
  { name: "One Flew Over the Cuckoo's Nest", value: 1975 },
  { name: 'Goodfellas', value: 1990 },
  { name: 'The Matrix', value: 1999 },
  { name: 'Seven Samurai', value: 1954 },
  { name: 'Star Wars: Episode IV - A New Hope', value: 1977 },
  { name: 'City of God', value: 2002 },
  { name: 'Se7en', value: 1995 },
  { name: 'The Silence of the Lambs', value: 1991 },
  { name: "It's a Wonderful Life", value: 1946 },
  { name: 'Life Is Beautiful', value: 1997 },
  { name: 'The Usual Suspects', value: 1995 },
  { name: 'Léon: The Professional', value: 1994 },
  { name: 'Spirited Away', value: 2001 },
  { name: 'Saving Private Ryan', value: 1998 },
  { name: 'Once Upon a Time in the West', value: 1968 },
  { name: 'American History X', value: 1998 },
  { name: 'Interstellar', value: 2014 },
  { name: 'Casablanca', value: 1942 },
  { name: 'City Lights', value: 1931 },
  { name: 'Psycho', value: 1960 },
  { name: 'The Green Mile', value: 1999 },
  { name: 'The Intouchables', value: 2011 },
  { name: 'Modern Times', value: 1936 },
  { name: 'Raiders of the Lost Ark', value: 1981 },
  { name: 'Rear Window', value: 1954 },
  { name: 'The Pianist', value: 2002 },
  { name: 'The Departed', value: 2006 },
  { name: 'Terminator 2: Judgment Day', value: 1991 },
  { name: 'Back to the Future', value: 1985 },
  { name: 'Whiplash', value: 2014 },
  { name: 'Gladiator', value: 2000 },
  { name: 'Memento', value: 2000 },
  { name: 'The Prestige', value: 2006 },
  { name: 'The Lion King', value: 1994 },
  { name: 'Apocalypse Now', value: 1979 },
  { name: 'Alien', value: 1979 },
  { name: 'Sunset Boulevard', value: 1950 },
  {
    name:
      'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    value: 1964,
  },
  { name: 'The Great Dictator', value: 1940 },
  { name: 'Cinema Paradiso', value: 1988 },
  { name: 'The Lives of Others', value: 2006 },
  { name: 'Grave of the Fireflies', value: 1988 },
  { name: 'Paths of Glory', value: 1957 },
  { name: 'Django Unchained', value: 2012 },
  { name: 'The Shining', value: 1980 },
  { name: 'WALL·E', value: 2008 },
  { name: 'American Beauty', value: 1999 },
  { name: 'The Dark Knight Rises', value: 2012 },
  { name: 'Princess Mononoke', value: 1997 },
  { name: 'Aliens', value: 1986 },
  { name: 'Oldboy', value: 2003 },
  { name: 'Once Upon a Time in America', value: 1984 },
  { name: 'Witness for the Prosecution', value: 1957 },
  { name: 'Das Boot', value: 1981 },
  { name: 'Citizen Kane', value: 1941 },
  { name: 'North by Northwest', value: 1959 },
  { name: 'Vertigo', value: 1958 },
  { name: 'Star Wars: Episode VI - Return of the Jedi', value: 1983 },
  { name: 'Reservoir Dogs', value: 1992 },
  { name: 'Braveheart', value: 1995 },
  { name: 'M', value: 1931 },
  { name: 'Requiem for a Dream', value: 2000 },
  { name: 'Amélie', value: 2001 },
  { name: 'A Clockwork Orange', value: 1971 },
  { name: 'Like Stars on Earth', value: 2007 },
  { name: 'Taxi Driver', value: 1976 },
  { name: 'Lawrence of Arabia', value: 1962 },
  { name: 'Double Indemnity', value: 1944 },
  { name: 'Eternal Sunshine of the Spotless Mind', value: 2004 },
  { name: 'Amadeus', value: 1984 },
  { name: 'To Kill a Mockingbird', value: 1962 },
  { name: 'Toy Story 3', value: 2010 },
  { name: 'Logan', value: 2017 },
  { name: 'Full Metal Jacket', value: 1987 },
  { name: 'Dangal', value: 2016 },
  { name: 'The Sting', value: 1973 },
  { name: '2001: A Space Odyssey', value: 1968 },
  { name: "Singin' in the Rain", value: 1952 },
  { name: 'Toy Story', value: 1995 },
  { name: 'Bicycle Thieves', value: 1948 },
  { name: 'The Kid', value: 1921 },
  { name: 'Inglourious Basterds', value: 2009 },
  { name: 'Snatch', value: 2000 },
  { name: '3 Idiots', value: 2009 },
  { name: 'Monty Python and the Holy Grail', value: 1975 },
];
const autoCopmpleOptions = { options: OptionTestData };
