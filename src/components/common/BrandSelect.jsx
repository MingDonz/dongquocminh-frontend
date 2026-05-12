"use client";
import React, { useState, useEffect } from "react";
import { getBrands } from "@/services/brandService";
import { isEmpty } from "@/utils/validators";
import Select from "@/components/common/Select";

export default function BrandSelect({ value, onChange, name}) {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  // gọi api
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getBrands({ trash: 0 });
        setBrands(data);
      } catch (e) {
        setErrors({ message: e.data.error });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(brands);

  return (
    <div>
      {!isEmpty(errors) ? (
        <p style={{ color: "red" }}>{errors.message}</p>
      ) : loading ? (
        <p>Loading brands...</p>
      ) : (
        <Select
          name={name}
          options={brands}
          valueKey="brand_id"
          labelKey="brand_name"
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}
