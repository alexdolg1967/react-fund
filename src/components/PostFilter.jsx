import React from 'react'
import MyInput from "./UI/Input/MyInput";
import { MySelect } from "./UI/Select/MySelect";

export const PostFilter = ({filter, setFilter}) => {
	return (
        <div className="search">
            <MyInput
                value={filter.query}
                onChange={(e) => setFilter({...filter, query: e.target.value})}
                placeholder="Поиск..."
            />
            <MySelect
                className="my_select"
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue="Сортировка "
                options={[
                    { value: "title", name: "По названию" },
                    { value: "body", name: "По описанию" },
                ]}
            />
        </div>
    );
}
