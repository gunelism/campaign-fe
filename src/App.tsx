import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CampaignList from "./components/CampaignList/CampaignList.tsx";
import CreateCampaign from "./components/CreateCampaign/CreateCampaign.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CampaignList />} />
                <Route path="/create" element={<CreateCampaign />} />
            </Routes>
        </Router>
    );
};

export default App;