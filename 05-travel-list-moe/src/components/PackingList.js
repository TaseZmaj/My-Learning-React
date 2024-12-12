import { useState } from "react";
import { Item } from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItems,
  handleClearList,
}) {
  //REACT go menadzira stateot na select poleto, NAMESTO html/vanilla Js.
  const [sortBy, setSortBy] = useState("input"); //

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  //tuka MORAS da napravis slice() na items-ot bidejki ako pises direktno items.sort()
  //ke ti se napraat sortedItems ko shto sakash, NO i items ke se sortnat, a toa ne go
  //sakas --> SHABLON: slice.sort()
  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
            item={item}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          {/*React go menadzira stateot na selectot*/}
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={() => handleClearList()}>Clear list</button>
      </div>
    </div>
  );
}
