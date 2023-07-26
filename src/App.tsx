import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IngredientsCreateForm from "./components/Ingredients/IngredientsCreateForm";
import IngredientsEditForm from "./components/Ingredients/IngredientsEditForm";
import IngredientsList from "./components/Ingredients/IngredientsList";
import IngredientsShow from "./components/Ingredients/IngredientsShow";
import UserList from "./components/user/UserList";
import UserShow from "./components/user/UserShow";
import Layout from "./components/Layout";
// import UserView from "./components/user/UserView";
function App() {
  const ingredientData = {
    id: 1,
    userId: "user123",
    name: "Onion",
    quantity: 100,
    date: "2023-07-25",
    unit: "kg",
    picture: null,
  };

  const handleSave = (data: any) => {
    console.log("Form data:", data);
  };
  return (
    <>
      <Router>
        <Layout>
        <Routes>
          <Route>
            <Route path="/ingredients">
              <Route path="" element={<IngredientsList />} />
              <Route path="create" element={<IngredientsCreateForm />} />
              <Route path=":id" element={<IngredientsShow />} />
              <Route path="show" element={<IngredientsShow />} />
              <Route
                path="editForm"
                element={
                  <IngredientsEditForm
                    ingredient={ingredientData}
                    onSave={handleSave}
                  />
                }
              />
            </Route>
          </Route>
          <Route>
            <Route path="/user">
              <Route path="" element={<UserList />} />
              <Route path=":id" element={<UserShow />} />
            </Route>
          </Route>
        </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
