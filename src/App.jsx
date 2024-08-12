
// import { Login } from './components/Login/Login';
// import { AppContext, useMyContext } from './Context';
import { Outlet } from 'react-router-dom';
import './App.scss';
import "./components/navBar/NavBar.css";
import { NavBar } from './components/navBar/NavBar';
import Footer from './components/footer/Footer';
import { useEffect } from 'react';
import useStore from './StoreZustand';
import { Login } from './components/utils/Login/Login';
// import { useEffect } from 'react';
// import { getAllCategories, getAllDishes, getAllIngredients, getAllPremixes, getAllProviders, getAllTags, getAllUsers, getDishesInStopList, getDishesToBeSold, getIngredientOrders } from './utils/fetch';
// import { ALLDISHES, OBG, TAGS } from './Obgects';


const App = () => {
  // const user = useStore((state) => state.user);
  // const setUser = useStore((state) => state.setUser);

  const formLogin = useStore((state) => state.formLogin);
  // const setFormLogin = useStore((state) => state.setFormLogin);

  // // const access_token = useStore((state) => state.access_token);
  // const setAccessToken = useStore((state) => state.setAccessToken);

  // // const refresh_token = useStore((state) => state.refresh_token);
  // const setRefreshToken = useStore((state) => state.setRefreshToken);

  // // const token_type = useStore((state) => state.token_type);
  // const setTokenType = useStore((state) => state.setTokenType);

  useEffect(() => {
    // getCurentUser().then((res) => {
    //   console.log(res);
    //   if (res.status === 200) {
    //     setUser(res.data);
    //     setFormLogin(true);
    //   }
    //   if(res.refresh_token){
    //     setRefreshToken(res.refresh_token);
    //   }
    //   if(res.access_token){
    //     setAccessToken(res.access_token);
    //   }
    //   if(res.token_type){
    //     setTokenType(res.token_type);
    //   }
    //   if(res.role){
    //     setUser(res.role);
    //   }
    // });

    // localStorage.setItem('categories', JSON.stringify(OBG));
    // localStorage.setItem('dishes', JSON.stringify(ALLDISHES));
    // localStorage.setItem('user', JSON.stringify(user));

    //   getAllDishes().then((data) => {
    //     localStorage.setItem('dishes', JSON.stringify(data));
    //   }).catch((error) => {
    //     localStorage.setItem('dishes', JSON.stringify(ALLDISHES));
    //   });

    //   getAllCategories()
    //     .then((data) => {
    //       localStorage.setItem('categories', JSON.stringify(data));
    //     })
    //     .catch((error) => {
    //       localStorage.setItem('categories', JSON.stringify(OBG));
    //     });

    //   getAllTags()
    //     .then((data) => {
    //       localStorage.setItem('tags', JSON.stringify(data));
    //     })
    //     .catch((error) => {
    //       localStorage.setItem('tags', JSON.stringify(TAGS));
    //     })
    //     ;

    //   getAllIngredients().then((data) => {
    //     localStorage.setItem('ingredients', JSON.stringify(data));
    //   });

    //   getAllPremixes().then((data) => {
    //     localStorage.setItem('premixes', JSON.stringify(data));
    //   });

    //   getAllProviders().then((data) => {
    //     localStorage.setItem('providers', JSON.stringify(data));
    //   });

    //   getAllUsers().then((data) => {
    //     localStorage.setItem('users', JSON.stringify(data));
    //   });

    //   getIngredientOrders().then((data) => {
    //     localStorage.setItem('orders', JSON.stringify(data));
    //   });

    //   getDishesInStopList().then((data) => {
    //     localStorage.setItem('stop-list', JSON.stringify(data));
    //   });

    //   getDishesToBeSold().then((data) => {
    //     localStorage.setItem('dish_to_sold', JSON.stringify(data));
    //   });

    //   // localStorage.setItem('few', JSON.stringify([]));
  }, []);

  if (!formLogin) {
    return <Login />;
  }

  // localStorage.setItem('dishes', JSON.stringify(ALLDISHES));
  // const dishesFromStorage = JSON.parse(localStorage.getItem('dishes'));

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Отримати дані з сервера
  //       const dishes = await getAllDishes();

  //       // Зберегти дані в LocalStorage
  //       localStorage.setItem('dishes', JSON.stringify(dishes));
  //       const dishesFromStorage = JSON.parse(localStorage.getItem('dishes'));

  //       // Перевірити, чи дані існують в LocalStorage
  //       if (dishesFromStorage) {
  //         // Встановити дані в стейт або використати їх для інших цілей
  //         setState((prevState) => ({
  //           ...prevState,
  //           allDishes: dishesFromStorage,
  //         }));
  //       } else {
  //         // Якщо дані не знайдено в LocalStorage, виконати відповідні дії або відобразити повідомлення
  //         console.log('Дані не знайдено в LocalStorage');
  //       }

  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData(); // Викликати функцію зразу
  // }, []);



  return (
    <div className="App">
      <div className="scroll-to-top">
      </div>
      <NavBar />
      <div className="conten">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
