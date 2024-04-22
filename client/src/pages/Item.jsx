import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Item = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    // Fetch items from backend API when component mounts
    async function fetchItem() {
      try {
        const response = await fetch(`http://localhost:4000/api/items/${id}`);
        if (response.ok) {
          const data = await response.json();
          setItem(data);
          setLoading(false);
        } else {
          throw new Error('Failed to fetch items');
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }

    fetchItem();
  }, []);

  const renderInformation = (info) => {
    return Object.entries(info).map(([key, value]) => {
      // If attribute contains </a> or imgsrc, don't show
      if (
        key.includes("</a>") ||
        (Array.isArray(value) && value.some((v) => v.includes("</a>"))) ||
        key.includes("imgsrc") ||
        key.includes("Focus") ||
        value == ""
      ) {
        return null;
      }

      if (key === "Slot") {
        // Join the "Slot" values with commas
        const formattedValue = value.join(", ");
        return (
          <span key={key}>
            {key}: {formattedValue}
          </span>
        );
      }

      if ((key === "Resistances" || key === "Stats") && Array.isArray(value)) {
        const formatted = value.map((el) => {
          // Split the string by spaces
          const parts = el.split(" ");
          // Join the parts with a comma after each number
          const formattedParts = parts.map((part, index) => {
            // Check if the part is a number (starts with a '+' and is followed by digits)
            if (part.startsWith("+") && !isNaN(Number(part.substr(1)))) {
              // If not the last part, add a comma after the number
              return index === parts.length - 1 ? part : part + ",";
            }
            return part;
          });
          // Join the formatted parts back into a string
          return formattedParts.join(" ");
        });

        // Return the formatted information
        return (
          <span key={key}>
            {key}: {formatted.join("  ")}
          </span>
        );
      }

      if (
        !key.includes("Delay") &&
        Array.isArray(value) &&
        value.some((v) => !isNaN(parseFloat(v)))
      ) {
        const formattedValue = value.map((v, index) => {
          // Check if the current value is a number
          const isNumber = !isNaN(parseFloat(v));
          // Add comma after number if it's not the last element in the array
          return isNumber && index !== value.length - 1 ? `${v},` : v;
        });
        return (
          <span key={key}>
            {key}: {formattedValue.join(" ")}
          </span>
        );
      }

      // Return each information attribute
      return (
        <span key={key}>
          {key}: {Array.isArray(value) ? value.join(" ") : value}
        </span>
      );
    });
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div id="Item">
      <img src={item.information.imgsrc} alt="" />
      <div className="item-info">
        <h2>{item.name}</h2>
        {renderInformation(item.information)}
      </div>
    </div>
  );
};

export default Item;
