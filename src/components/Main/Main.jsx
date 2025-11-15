import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({ clothingItems, handleOpenItemModal }) {
  return (
    <main className="main">
      <WeatherCard />
      <p className="main__text">Today is 75° F / You may want to wear:</p>
      <div className="main__cards">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              data={item}
              onClick={handleOpenItemModal}
            />
          );
        })}
      </div>
    </main>
  );
}

export default Main;
