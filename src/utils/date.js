export default function date() {
  const getCurrentDateInDDMMYYYYFormat = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0"); // Get day and pad with leading zero if needed
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Get month (add 1 since months are zero-indexed) and pad with leading zero if needed
    const year = now.getFullYear(); // Get full year (4 digits)

    return `${day}/${month}/${year}`;
  };
  const increaseDateByDays = (originalDate, daysToAdd) => {
    const parts = originalDate.split("/");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Subtract 1 to account for zero-based months
    const year = parseInt(parts[2], 10);

    const date = new Date(year, month, day); // Create a Date object with the original date

    date.setDate(date.getDate() + daysToAdd); // Increase the date by the specified number of days

    // Extract the components of the updated date
    const newDay = date.getDate();
    const newMonth = date.getMonth() + 1; // Add 1 to convert back to one-based month
    const newYear = date.getFullYear();

    // Format the updated date as 'dd/mm/yyyy'
    const formattedDate = `${String(newDay).padStart(2, "0")}/${String(
      newMonth
    ).padStart(2, "0")}/${newYear}`;

    return formattedDate;
  };
  const formatDateInTimezone = (date) => {
    if (date) {
      const options = {
        timeZone: "Asia/Bangkok",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };
      
      return new Date(date).toLocaleDateString("en-GB", options);
    }

    return "";
  };
  return { getCurrentDateInDDMMYYYYFormat, increaseDateByDays, formatDateInTimezone }
}
