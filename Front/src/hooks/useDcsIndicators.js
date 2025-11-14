import {
  getDcsCandelariaIndicators,
  getDcsDesaladoraIndicators,
} from "../utils/Api-candelaria/api";

export const useDcsIndicators = async () => {
  try {
    const dataDcsCandelaria = await getDcsCandelariaIndicators();
    const dataDcsDesaladora = await getDcsDesaladoraIndicators();
    return {
      dataDcsCandelaria,
      dataDcsDesaladora,
    };
  } catch (error) {
    console.error("Error fetching DCS indicators:", error);
    throw error;
  }
};
