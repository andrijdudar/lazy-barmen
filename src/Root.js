import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import StopList from './components/StopList/StopList';
import { Menu } from './components/Menu/Menu';
import { CocktailForm } from './components/cocktails/CocktailForm';
import { DishDetails } from './components/Dish/components/DishDetails/DishDetails';
import { NotFound } from './components/NotFound/NotFound.jsx';
import { Administration } from './components/Administration/Administration.jsx';
import { AddDish } from './components/Administration/components/AddDish/AddDish.jsx';
import { Ingredients } from './components/Administration/components/Ingredients/Ingredients.jsx';
import { AddPremix } from './components/Administration/components/Premix/AddPremix/AddPremix.jsx';
import { Premix } from './components/Administration/components/Premix/Premix.jsx';
import { Categories } from './components/Administration/components/Categories/Categories.jsx';
import { AddCategory } from './components/Administration/components/Categories/AddCategory/AddCategory.jsx';
import { Users } from './components/Administration/components/Users/Users.jsx';
import { CreateUser } from './components/Administration/components/Users/CreateUser/CreateUser.jsx';
import { Login } from './components/utils/Login/Login.jsx';
import { ProtectedRoutes } from './utils/ProtectedRouter/ProtectedRouter.jsx';
import PublicRoute from './utils/PublicRoute/PublicRoute.jsx';
// import { TestPage } from './components/utils/TestPage/TestPage.jsx';

export const Root = () => (
  <Router>
    {/* <Context> */}
    <Routes>
      {/* <Route path="/test" element={<TestPage />} /> */}
      {/* <Route path="/login" element={<Login />} /> */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<App />}>
          <Route index element={<StopList />} />
          <Route path="list" element={<Navigate to="/" replace={true} />} />
          <Route path="menu" element={<Menu />} />
          <Route path="detailsDish/:id" element={<DishDetails />} />
          <Route path="newdish" element={<CocktailForm />} />
          <Route path="admin" element={<Administration />} >
            <Route path="addDish" element={<AddDish />} />
            <Route path="ingredients" element={<Ingredients />} />
            <Route path="premix" element={<Premix />} />
            <Route path="addPremix" element={<AddPremix />} />
            <Route path="categories" element={<Categories />} />
            <Route path="addCategory" element={<AddCategory />} />
            <Route path="users" element={<Users />} />
            <Route path="createUser" element={<CreateUser />} />
            <Route path="addProvider" element={<h1>Додати Постачальника</h1>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>

    {/* </Context> */}
  </Router>
);
