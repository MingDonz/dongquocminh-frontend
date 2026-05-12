"use client";
import React, { useState, useEffect } from "react";
import { getCategories } from "@/services/categoryService";
import { isEmpty } from "@/utils/validators";
import Select from "@/components/common/Select";

export default function CategorySelect({ name, value, onChange }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  // goi api
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getCategories({ trash: 0 });
        setCategories(data);
      } catch (e) {
        setErrors({ message: e.data.error });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log(categories);
  return (
    <div>
      {!isEmpty(errors) ? (
        <p>{errors.message}</p>
      ) : loading ? (
        <p>Loading categories...</p>
      ) : (
        <Select
          options={categories}
          valueKey="cat_id"
          labelKey="cat_name"
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}
