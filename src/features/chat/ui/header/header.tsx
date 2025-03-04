import React from "react";

interface iHeader {
  name: string;
}

export const Header = (props: iHeader) => {
  const { name } = { ...props };
  if (name?.length)
    return (
      <header>
        <h1>Чатимся с {name}</h1>
      </header>
    );
  return <div>ОШИБКА</div>;
};
