import { useMemo } from 'react';
import { getHeroesByPublisher } from '../helpers';
import { HeroCard } from './';

export const HeroList = ({ publisher }) => {

  const heroes = useMemo(() => getHeroesByPublisher( publisher ), [ publisher ]) ;

  return (
    <div className="row row-cols-1 row-cols-md-3 g-3">
      { heroes.map( heroe => (
        <HeroCard 
          key={ heroe.id }
          { ...heroe }
        />
      ) ) }
    </div>
  )
}
