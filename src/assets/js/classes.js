let selectItem = document.querySelectorAll(
  ".description-advantages__advantages-item > .description-advantages__advantages-item-text"
);

for (let i = 0; i < selectItem.length; i++) {
  let item = selectItem[i];
  item.classList.add("description-advantages__advantages-item-text-" + (i + 1));
}
