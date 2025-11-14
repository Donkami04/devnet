export const useWanDates = () => {
  const currentDate  = new Date();
  const currentMonth  = currentDate.getMonth();
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const currentMonthName = monthNames[currentMonth];
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousMonthName = monthNames[previousMonth];
  const today = currentDate.getDate();

  return {
    currentMonthName,
    previousMonthName,
    today,
  };
}
