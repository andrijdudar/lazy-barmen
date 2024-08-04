import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import { Context } from './Context';
import StopList from './components/StopList/StopList';
import { Menu } from './components/Menu/Menu';
import { CocktailForm } from './components/cocktails/CocktailForm';
import { Administration } from './components/Administration/Administration';
import { DishDetails } from './components/Dish/components/DishDetails/DishDetails';
import { NotFound } from './components/NotFound/NotFound.jsx';
import { AddDish } from './components/Administration/components/AddDish/AddDish.jsx';
import { Ingredients } from './components/Administration/components/Ingredients/Ingredients.jsx';
import { AddPremix } from './components/Administration/components/Premix/components/AddPremix/AddPremix.jsx';
import { Premix } from './components/Administration/components/Premix/components/Premix.jsx';
import { Categories } from './components/Administration/components/Categories/Categories.jsx';
import { AddCategory } from './components/Administration/components/Categories/AddCategory/AddCategory.jsx';
import { Users } from './components/Administration/components/Users/Users.jsx';
import { CreateUser } from './components/Administration/components/Users/CreateUser/CreateUser.jsx';
// import { SideBarAdmin } from './components/Administration/components/SideBarAdmin/SideBarAdmin.jsx';


export const Root = () => (
  <Router>
    <Context>
      <Routes>
        <Route path="/" element={<App />}>
          {/* <Route path="/" element={<SideBar />} /> */}
          <Route index element={<StopList />} />
          <Route path="list" element={<Navigate to="/" replace={true} />} />
          <Route path="menu" element={<Menu />} />
          <Route path="detailsDish/:id" element={<DishDetails />} />
          <Route path="newdish" element={<CocktailForm />} />
          <Route path="admin" element={<Administration />} >
            {/* <Route index element={<SideBarAdmin />} /> */}
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
      </Routes>
    </Context>
  </Router>
);
