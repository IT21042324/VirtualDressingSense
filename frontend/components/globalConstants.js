const GlobalConstants = {
  genderSelectionOptions: [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
  ],
  sizeSelectionOption: [
    { key: "1", value: "XXS" },
    { key: "2", value: "XS" },
    { key: "3", value: "S" },
    { key: "4", value: "M" },
    { key: "5", value: "L" },
    { key: "6", value: "XL" },
    { key: "7", value: "XXL" },
  ],
  typeSelectionOption: [
    { key: "1", value: "Formal" },
    { key: "2", value: "Casual" },
    { key: "3", value: "Business Casual" },
    { key: "4", value: "Sports Wear" },
    { key: "5", value: "Street Wear" },
    { key: "6", value: "Slim Fit" },
    { key: "7", value: "Regular Fit" },
    { key: "8", value: "Relaxed Fit" },
  ],
  mainTypeSelectionOption: [
    { key: "1", value: "Top" },
    { key: "1", value: "Bottom" },
  ],
  measurementTypeSelectionOption: [
    { key: "1", value: "in" },
    { key: "1", value: "cm" },
  ],
  categorySelectionOption: [
    { key: "1", value: "Kids" },
    { key: "2", value: "Teens" },
    { key: "3", value: "Adult" },
  ],
};

const h1 = "Store Statistics";
const h2 = "heading 2";
const para = "Something description";
export const pdf_html = `<div>
                          <h1 style="font-size: 24px; color: blue; text-align: center;">${h1}</h1>
                          <h2 style="font-size: 18px; color: green; text-align: left;">${h2}</h2>
                          <p style="font-size: 14px; color: black; text-align: justify;">${para}</p>
                  </div>`;

export default GlobalConstants;
