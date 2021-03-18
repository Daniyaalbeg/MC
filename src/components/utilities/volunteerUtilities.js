export const convertEducationLevel = (e) => {
  switch (e) {
    case "primary":
      return "Primary";
    case "secondary":
      return "Secondary";
    case "other":
      return "Other";
  }
};

export const convertEmploymentStatus = (e) => {
  switch (e) {
    case "HOME-MAKER":
      return "Home Maker";
    case "PRIVATE-SECTOR":
      return "Private Sector";
    case "PUBLIC-SECTOR":
      return "Public Sector";
    case "GOVERNMENT":
      return "Government";
    case "PART-TIME":
      return "Part time work";
    case "STUDENT":
      return "Student";
    case "UNEMPLOYED":
      return "Unemployed";
    case "RETIRED":
      return "Retired";
    case "SELF-EMPLOYED":
      return "Self Employed";
    case "OTHER":
      return "Other";
  }
};
