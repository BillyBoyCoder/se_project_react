import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { defaultClothingItems } from "../../utils/defaultClothing";
import "./App.css";

function App() {
  // State to hold an object of clothing items
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  // State to track which modal is currently active
  // Empty string means no modal is open
  const [activeModal, setActiveModal] = useState("");
  // State to track which card was clicked
  const [selectedCard, setSelectedCard] = useState(null);

  // Handler to open the item modal
  // Sets activeModal to "active-modal" to display the modal
  // Receives the card data and stores it in selectedCard state
  function handleOpenItemModal(card) {
    setActiveModal("active-modal");
    setSelectedCard(card);
  }

  // Handler to close any open modal
  // Sets activeModal back to empty string
  function handleCloseModal() {
    setActiveModal("");
  }

  return (
    <div className="app">
      <Header />
      <Main
        clothingItems={clothingItems}
        handleOpenItemModal={handleOpenItemModal}
      />
      <Footer />
      {/* Render ItemModal and pass isOpen prop */}
      {/* isOpen is true when activeModal equals "active-modal" */}
      <ItemModal
        isOpen={activeModal === "active-modal"}
        card={selectedCard}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
