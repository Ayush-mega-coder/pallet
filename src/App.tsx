
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Layout from "./components/Layout";
import Admin from "./components/Admin";
import IngredientsCreateForm from "./components/Ingredients/IngredientsCreateForm";
import IngredientsEditForm from "./components/Ingredients/IngredientsEditForm";
import IngredientsList from "./components/Ingredients/IngredientsList";
import IngredientsShow from "./components/Ingredients/IngredientsShow";
import UserList from "./components/user/UserList";
import UserShow from "./components/user/UserShow";
// import UserView from "./components/user/UserView";
function App() {
  const ingredientData = {
    id: 1,
    userId: "user123",
    name: "Onion",
    quantity: 100,
    date: "2023-07-25",
    unit: "kg",
    picture: "picture.jpg",
  };

  const handleSave = (data: any) => {

    console.log("Form data:", data);
  };
  return (
    <>
    <Router>
      
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route>
            <Route path='/ingredients' >
            <Route
              path="create"
              element={<IngredientsCreateForm />}
            />
            <Route path="list" element={<IngredientsList />} />
            <Route path=":id" element={<IngredientsShow />} />
            <Route path="show" element={<IngredientsShow />} />
            <Route
              path="editForm"
              element={ <IngredientsEditForm ingredient={ingredientData} onSave={handleSave} />}
            />
            </Route>
          </Route>
          <Route>
            <Route path="/user"  >
              <Route path="userList" element={<UserList/>}/>
            <Route path=":id" element={<UserShow />} />

            </Route>
          </Route>
        </Routes>
      
    </Router>
    </>
  );
}

export default App;
