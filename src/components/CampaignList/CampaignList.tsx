import React, {useCallback, useEffect, useState} from "react";
import { getCampaigns, toggleCampaignStatus } from "../../api/campaignApi.ts";
import { Campaign } from "../../types";
import { Link } from "react-router-dom";
import styles from "./CampaignList.module.css";

const CampaignList: React.FC = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [search, setSearch] = useState("");
    const [isRunning, setIsRunning] = useState<string>("");

    const fetchCampaigns = useCallback(async () => {
        try {
            const queryParams = new URLSearchParams();
            if (search) queryParams.append("title", search);
            if (isRunning) queryParams.append("isRunning", isRunning);

            const data = await getCampaigns(`?${queryParams.toString()}`);
            setCampaigns(data.data);
            console.log(data);
        } catch (error) {
            console.error("Failed to fetch campaigns:", error);
        }
    }, [search, isRunning]); // Dependencies

    useEffect(() => {
        fetchCampaigns().then(() => {
            console.log("Campaigns fetched successfully");
        });
    }, [fetchCampaigns]);

    const handleToggle = async (id: string) => {
        try {
            await toggleCampaignStatus(id);
            await fetchCampaigns();
        } catch (error) {
            console.error("Failed to toggle campaign status:", error);
        }
    };

    const resetFilters = () => {
        setSearch("");
        setIsRunning("");
    };


    return (
        <div className={styles.container}>
            <h1 className="header">Campaigns</h1>
            <Link to="/create">
                <button className={styles.button}>Create Campaign</button>
            </Link>
            <div style={{marginBottom: "1rem"}}>
                <input
                    type="text"
                    placeholder="Search by Title"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles.input}
                />
                <select
                    value={isRunning}
                    onChange={(e) => setIsRunning(e.target.value)}
                    className={styles.input}
                >
                    <option value="">All</option>
                    <option value="true">Running</option>
                    <option value="false">Stopped</option>
                </select>
                <button
                    onClick={resetFilters}
                    style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#f44336",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Reset Filters
                </button>
            </div>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Landing Page</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {campaigns.map((campaign) => (
                    <tr key={campaign.id}>
                    <td>{campaign.title}</td>
                        <td>
                            <a href={campaign.landingPageURL} target="_blank" rel="noopener noreferrer">
                                {campaign.landingPageURL}
                            </a>
                        </td>
                        <td>{campaign.isRunning ? "Running" : "Stopped"}</td>
                        <td>
                            <button
                                onClick={() => handleToggle(campaign.id!)}
                                className={styles.button}
                                style={{
                                    backgroundColor: campaign.isRunning ? "#f44336" : "#4caf50",
                                }}
                            >
                                {campaign.isRunning ? "Stop" : "Run"}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CampaignList;