import axios from "axios";
import { Campaign } from "../types";

const BASE_URL = "http://localhost:3000/api/campaigns";

interface ApiResponse {
    data: Campaign[];
}

export const getCampaigns = async (query: string = ""): Promise<ApiResponse> => {
    try {
        const response = await axios.get<ApiResponse>(`${BASE_URL}${query}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching campaigns:", error);
        return { data: [] };
    }
};

export const createCampaign = async (campaign: Campaign): Promise<Campaign> => {
    const response = await axios.post(BASE_URL, campaign);
    return response.data;
};

export const toggleCampaignStatus = async (id: string): Promise<Campaign> => {
    const response = await axios.put(`${BASE_URL}/${id}`);
    return response.data;
};