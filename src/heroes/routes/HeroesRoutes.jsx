import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from '../../ui';
import { DcPage, MarvelPage, SearchPage, HeroPage } from '../../heroes';
export const HeroesRoutes = () => {
  return (
    <>
      <Navbar />
      
      <div className="container mt-3">

        <Routes>
          <Route path="marvel" element={<MarvelPage />} />
          <Route path="dc" element={<DcPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="hero/:heroId" element={<HeroPage />} />

          <Route path="/" element={<Navigate to="/marvel" />} />
        </Routes>

      </div>
      
    </>
  )
}
