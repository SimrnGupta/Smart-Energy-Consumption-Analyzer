'use client';

import * as d3 from "d3";
import { SetStateAction, useEffect, useState } from "react";

import Header from "@/components/ui/Header";
import { LineChart } from "@/components/charts/LineChart";
import Dropdown from "@/components/ui/Dropdown";
import { PromptQuery } from "@/components/ui/PromptQuery";
import CardNew from "@/components/ui/CardNew";

interface Point {
    x: string | number | Date;
    y: number | string | Date;
}
  
interface ChartData {
    id: string;
    data: Point[];
}
  
export interface ChartProps {
    chartData: ChartData[];
    xLabel: string;
    yLabel: string;
}


const Dashboard = () => {
    // const [data, setData] = useState<d3.DSVRowArray<string>>();
    // const [groupedDataByCountry, setGroupedDataByCountry] = useState<[string, d3.DSVRowString<string>[]][]>();
    const [nivoData, setNivoData] = useState<ChartData[]>();
    const [selectedVariable, setSelectedVariable] = useState<string>('');

    const csvURL = "https://gist.githubusercontent.com/SimrnGupta/87d0cca2398dfb1db7ffbd41122a589e/raw/smart_energy_predicted_values.csv";

    // Function to parse CSV and transform the data
    const parseAndTransformData = async (csvFile: string) => {
        const data = await d3.csv(csvFile);
    
        // Group data by 'Entity'
        const groupedData = d3.groups(data, d => d.Entity);

    
        // Transform into Nivo-compatible format
        const nivoData = groupedData.map(([key, values]) => ({
        id: key,
        data: values.map(d => ({
            x: +d.Year,
            y: +d["Renewable-electricity-generating-capacity-per-capita"]
        }))
        }));
    
        return nivoData;
    };


    // Select charts
    const variables = [
        { label: 'Access to Electricity (% of population)', value: 'accessToElectricity' },
        { label: 'Access to Clean Fuels for Cooking', value: 'accessToCleanFuels' },
        { label: 'Renewable Electricity Generating Capacity', value: 'renewableCapacity' }
      ];
    
    const handleVariableSelect = (variable: string) => {
        console.log("Selected Variable:", variable);
        setSelectedVariable(variable);
    };

    // Gemini Prompt
    const [searchQuery, setSearchQuery] = useState('');
    const [promptResponse, setPromptResponse] = useState('');

    const handleInputChange = (event: any) => {
        setSearchQuery(event.target.value);
        console.log(event.target.value)
    };


    const handleSubmit = async (event: any) => {
        event.preventDefault(); // Prevent the form from submitting traditionally
        try {
        const response = await fetch('http://127.0.0.1:5000/search', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: searchQuery }),
        });
        const data = await response.json();
        setPromptResponse(data.response);
        } catch (error) {
        console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (csvURL) {
            parseAndTransformData(csvURL).then(transformedData => {
                setNivoData(transformedData);
                console.log(transformedData)
            });
        }
    }, [selectedVariable, searchQuery, promptResponse]);

    return (
        <div className="dark:bg-gray-900">
            <Header title="Smart Energy Emission Prediction" />
            <div className="flex h-screen">
                {/* ------------------ */}
                    <div className="flex-2 p-6">
                        <div className="mb-6 space-y-4">
                            <h2 className="text-2xl font-bold">Ask Gemini about the Trends</h2>
                            <PromptQuery searchQuery={searchQuery} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
                        </div>
                        <div className="space-y-4 min-w-96 max-w-96">
                            {/* <h2 className="text-2xl font-bold">API Response</h2> */}
                            <CardNew
                            content = {
                                <div className="flex flex-col min-h-96">
                                    {promptResponse ? 
                                    <p className="mt-3 text-gray-900 text-gray-600">{promptResponse}</p> 
                                    : 
                                    <p className="mt-3 text-gray-900 text-gray-600">This is the response from the Gemini API.</p>
                                    }
                                </div>
                            }
                            />
                        </div>
                    </div>

                    {/* ------------- */}

                    {/* -------------- */}

                    <div className="flex-1 border-r border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
                        <div className="mb-6 space-y-4">
                            <h2 className="text-2xl font-bold text-center">Sustainability Predictions</h2>
                            <div className="flex items-center justify-between">
                                <Dropdown options={variables} onOptionSelected={handleVariableSelect} />
                            </div>
                            <div >
                                <CardNew
                                    title="Emissions Prediction"
                                    content={
                                        <div>
                                        {nivoData ? <LineChart chartData={nivoData} xLabel="Year" yLabel="Emmisions Prediction" /> : <p>Loading data...</p>}
                                        </div>
                                        // <LineChart chartData={nivoData}/>
                                        // <p className="text-gray-500 dark:text-gray-400">
                                        //     This is the prediction for future emissions levels based on the ML model.
                                        // </p>
                                    }
                                />
                                {/* <CardNew
                                    title="Sustainable Energy Usage"
                                    content={
                                        <p className="text-gray-500 dark:text-gray-400">
                                            This is the prediction for sustainable energy usage in the coming years.
                                        </p>
                                    }
                                />
                                <CardNew
                                    title="Financial Flow"
                                    content={
                                        <p className="text-gray-500 dark:text-gray-400">
                                            This is the prediction for financial flow towards sustainable energy sources.
                                        </p>
                                    }
                                />
                                <CardNew
                                    title="Renewable Energy Adoption"
                                    content={
                                        <p className="text-gray-500 dark:text-gray-400">
                                            This is the prediction for the adoption of renewable energy sources.
                                        </p>
                                    }
                                /> */}
                            </div>
                        </div>
                    </div>

                    {/* ---------------- */}
            </div>
        </div>
    );
};
  
export default Dashboard;