// Shape of items
type Item = {
  title: string;
  items: { title: string; href: string }[];
};

// Items
const navItems: Item[] = [
  // Javascript basics
  {
    title: "JavaScript",
    items: [
      { title: "Basics", href: "/js/basics" },
      { title: "Data Types", href: "/js/data-types" },
    ],
  },

  // Level 1
  {
    title: "Level 1",
    items: [{ title: "Even and Odd", href: "/level-1/even-odd" }],
  },
];

export default navItems;
