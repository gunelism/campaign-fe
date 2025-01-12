import React, { useState } from "react";
import { createCampaign } from "../../api/campaignApi.ts";
import { Campaign, Payout } from "../../types";
import { Link } from "react-router-dom";
import styles from "./CreateCampaign.module.css";

const CreateCampaign: React.FC = () => {
    const [title, setTitle] = useState("");
    const [landingPageURL, setLandingPageURL] = useState("");
    const [payouts, setPayouts] = useState<Payout[]>([{ country: "", amount: 0 }]);

    const handleAddPayout = () => setPayouts([...payouts, { country: "", amount: 0 }]);

    const handleRemovePayout = (index: number) => {
        if (payouts.length > 1) {
            setPayouts(payouts.filter((_, i) => i !== index));
        }    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const campaign: Campaign = { title, landingPageURL, isRunning: false, payouts };
        await createCampaign(campaign);
        alert("Campaign created successfully!");
    };

    return (
        <div className={styles.container}>
            <h1 className="header">Create Campaign</h1>
            <Link to="/">
                <button className={styles.button}>Home</button>
            </Link>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                    <label>Title:</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <div>
                    <label>Landing Page URL:</label>
                    <input
                        value={landingPageURL}
                        onChange={(e) => setLandingPageURL(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <div>
                    <h2>Payouts</h2>
                    {payouts.map((payout, index) => (
                        <div key={index} className={styles.payout}>
                            <input
                                placeholder="Country"
                                value={payout.country}
                                onChange={(e) =>
                                    setPayouts(
                                        payouts.map((p, i) =>
                                            i === index ? { ...p, country: e.target.value } : p
                                        )
                                    )
                                }
                                className={styles.input}
                            />
                            <input
                                placeholder="Amount"
                                type="number"
                                value={payout.amount}
                                onChange={(e) =>
                                    setPayouts(
                                        payouts.map((p, i) =>
                                            i === index ? { ...p, amount: parseFloat(e.target.value) } : p
                                        )
                                    )
                                }
                                className={styles.input}
                            />
                            <button
                                type="button"
                                onClick={() => handleRemovePayout(index)}
                                className={styles.button}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddPayout} className={styles.button}>
                        Add Payout
                    </button>
                </div>
                <button type="submit" className={styles.button}>
                    Create Campaign
                </button>
            </form>
        </div>
    );
};

export default CreateCampaign;