import { portfolioData } from "@/assets/data/portfolioData";
import { Portfolio } from "@/models/porfolioModel";

export const getPFDetails = async (): Promise<Array<Portfolio>> => {
    // axios call to fetch portfolio data
    return portfolioData 
}