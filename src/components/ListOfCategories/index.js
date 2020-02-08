import React, { useEffect, useState, Fragment } from "react";
import { Category } from "../Category";

import { List, Item } from "./styles";

function useCategoriesData() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    setLoading(true);
    const response = await fetch(
      "https://petgram-server-santiagoprieto-dm3pfhuwh.now.sh/categories"
    );
    const data = await response.json();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    const getData = async () => {
      await getCategories();
    };

    getData();
  }, []);

  return { categories, loading };
}

export const ListOfCategories = () => {
  const { categories, loading } = useCategoriesData();
  const [showFixed, setShowFixed] = useState(false);

  useEffect(() => {
    const onScroll = e => {
      const newShowFixed = window.scrollY > 190;
      showFixed !== newShowFixed && setShowFixed(newShowFixed);
    };

    document.addEventListener("scroll", onScroll);

    return () => document.removeEventListener("scroll", onScroll);
  }, [showFixed]);

  const renderList = fixed => {
    return (
      <List fixed={fixed}>
        {loading ? (
          <Item key="loading">
            <Category />
          </Item>
        ) : (
          categories.map(category => (
            <Item key={category.id}>
              <Category {...category} path={`/pet/${category.id}`} />
            </Item>
          ))
        )}
      </List>
    );
  };

  return (
    <Fragment>
      {renderList()}
      {/* {renderList(true)} */}
      {showFixed && renderList(true)}
    </Fragment>
  );
};
