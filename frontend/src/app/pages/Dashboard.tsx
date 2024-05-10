'use client';

import * as d3 from "d3";
import { useEffect, useState } from "react";

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
    const [co2EmissionsByCountryData, setCo2EmissionsByCountryData] = useState<ChartData[]>();
    const [renewableEnergyShareInTotalFinalEnergyConsumptionData, setRenewableEnergyShareInTotalFinalEnergyConsumptionData] = useState<ChartData[]>();
    const [primaryEneryPerCapitaData, setPrimaryEneryPerCapitaData] = useState<ChartData[]>();
    const [renewableCapacityData, setRenewableCapacityData] = useState<ChartData[]>();
    // const [financialFlowData, financialFlowData] = useState<ChartData[]>();
    // const [accessToElectricityData, accessToElectricityData] = useState<ChartData[]>();

    const [selectedVariable, setSelectedVariable] = useState<string>('co2EmissionsByCountry');

    const csvURL = "https://gist.githubusercontent.com/SimrnGupta/87d0cca2398dfb1db7ffbd41122a589e/raw/smart_energy_predicted_values.csv";


    // Select charts
    const variables = [
        { label: 'Carbon dioxide emissions (kilo ton)', value: 'co2EmissionsByCountry' },
        { label: 'Renewable energy share in the total final energy consumption (%)', value: 'renewableEnergyShareInTotalFinalEnergyConsumption'},
        { label: 'Primary energy consumption per capita (kWh/person)', value: 'primaryEneryPerCapita' },
        { label: 'Renewable Electricity Generating Capacity', value: 'renewableCapacity' },
    ];
    
    const handleVariableSelect = (variable: string) => {
        console.log("Selected Variable:", variable);
        setSelectedVariable(variable);
    };
    

    // Function to parse CSV and transform the data
    const parseAndTransformData = async (csvFile: string) => {
        const data = await d3.csv(csvFile);
    
        // Group data by 'Entity' (Country)
        const groupedData = d3.groups(data, d => d.Entity);

        const co2EmissionsByCountryData = groupedData.map(([key, values]) => ({
            id: key,
            data: values.map(d => ({
                x: +d.Year,
                y: +d["Value_co2_emissions_kt_by_country"]
            }))
        }));
        setCo2EmissionsByCountryData(co2EmissionsByCountryData);

        const renewableEnergyShareInTotalFinalEnergyConsumptionData = groupedData.map(([key, values]) => ({
            id: key,
            data: values.map(d => ({
                x: +d.Year,
                y: +d["Renewable energy share in the total final energy consumption (%)"]
            }))
        }));
        setRenewableEnergyShareInTotalFinalEnergyConsumptionData(renewableEnergyShareInTotalFinalEnergyConsumptionData);

        const primaryEneryPerCapitaData = groupedData.map(([key, values]) => ({
            id: key,
            data: values.map(d => ({
                x: +d.Year,
                y: +d["Primary energy consumption per capita (kWh/person)"]
            }))
        }));
        setPrimaryEneryPerCapitaData(primaryEneryPerCapitaData);

        const renewableCapacityData = groupedData.map(([key, values]) => ({
            id: key,
            data: values.map(d => ({
                x: +d.Year,
                y: +d["Renewable-electricity-generating-capacity-per-capita"]
            }))
        }));
        setRenewableCapacityData(renewableCapacityData);
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
        parseAndTransformData(csvURL);
    }, [selectedVariable, searchQuery, promptResponse]);

    return (
        <div className="dark:bg-sky-500">
            <Header title="Sustainable Energy Analytics" />
            <div className="flex">

                    <div className="flex-2 p-6">
                        <div className="mb-6 space-y-4">
                            <h2 className="text-xl font-bold text-center">Talk to our Gemini Energy Advisor</h2>
                            <PromptQuery searchQuery={searchQuery} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
                        </div>
                        <div className="space-y-4 min-w-96 max-w-96">
                            <CardNew
                            content = {
                                <div className="flex flex-col min-h-96">
                                    {promptResponse ? 
                                    <p className="text-gray-900 text-gray-600">{promptResponse}</p> 
                                    : 
                                    <p className="text-gray-900 text-gray-600 text-center mt-10">This is the response from our fine-tuned Gemini model.</p>
                                    }
                                </div>
                            }
                            />
                        </div>
                    </div>

                    <div className="flex-1 border-r border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-sky-500">
                        <div className="mb-6 space-y-4">
                            <h2 className="text-xl font-bold text-center underline">Understanding Trends visualizing Past Data vs Predictions</h2>
                            <div className="flex items-center justify-between">
                                <Dropdown options={variables} onOptionSelected={handleVariableSelect} />
                            </div>
                            <div >
                                {
                                   selectedVariable == 'renewableEnergyShareInTotalFinalEnergyConsumption' && 
                                   <CardNew
                                    title="Renewable energy share in the total final energy consumption (%)"
                                    content={
                                        <div>
                                        {renewableEnergyShareInTotalFinalEnergyConsumptionData ? <LineChart chartData={renewableEnergyShareInTotalFinalEnergyConsumptionData} xLabel="Year" yLabel="Renewable energy share (%)" /> : <p>Loading Chart...</p>}
                                        </div>
                                    }
                                />
                                }

                                {
                                   selectedVariable == 'co2EmissionsByCountry' && 
                                   <CardNew
                                    title="Carbon dioxide Emissions"
                                    content={
                                        <div>
                                        {co2EmissionsByCountryData ? <LineChart chartData={co2EmissionsByCountryData} xLabel="Year" yLabel="CO2 Emissions (kt)" /> : <p>Loading Chart...</p>}
                                        </div>
                                    }
                                />
                                }

                                {
                                   selectedVariable == 'primaryEneryPerCapita' && 
                                   <CardNew
                                    title="Primary energy consumption per capita (kWh/person)"
                                    content={
                                        <div>
                                        {primaryEneryPerCapitaData ? <LineChart chartData={primaryEneryPerCapitaData} xLabel="Year" yLabel="Primary energy consumption (kWh/person)" /> : <p>Loading Chart...</p>}
                                        </div>
                                    }
                                />
                                }

                                {
                                   selectedVariable == 'renewableCapacity' && 
                                   <CardNew
                                    title="Renewable Electricity Generating Capacity"
                                    content={
                                        <div>
                                        {renewableCapacityData ? <LineChart chartData={renewableCapacityData} xLabel="Year" yLabel="Renewable Electricity Generating Capacity" /> : <p>Loading Chart...</p>}
                                        </div>
                                    }
                                />
                                }
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
};
  
export default Dashboard;