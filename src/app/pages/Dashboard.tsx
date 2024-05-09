import Header from "@/components/ui/Header";

import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import CardNew from "@/components/ui/CardNew";
import { SearchIcon } from "@/components/ui/Icons";

const Dashboard = () => {
    return (
        <div className="dark:bg-gray-900">
            <Header title="Smart Energy Emission Prediction" />
            <div className="flex h-screen">
                {/* <div className="flex h-screen w-full flex-col lg:flex-row"> */}
                {/* ------------------ */}
                    <div className="flex-2 p-6">
                        <div className="mb-6 space-y-4">
                            <h2 className="text-2xl font-bold">Ask Gemini about the Trends</h2>
                            <div className="flex items-center rounded-md border border-gray-200 border-gray-300 bg-white px-4 py-2 shadow-sm dark:border-gray-700 dark:bg-gray-950 dark:border-gray-800">
                                <SearchIcon className="h-5 w-5 text-gray-400" />
                                <Input
                                className="w-full border-0 focus:ring-0 dark:bg-gray-950 dark:text-gray-50"
                                placeholder="Search the Gemini API"
                                type="text"
                                />
                            </div>
                        </div>
                        <div className="space-y-4 min-w-96 max-w-96">
                            {/* <h2 className="text-2xl font-bold">API Response</h2> */}
                            <CardNew
                            content = {
                                <div className="flex flex-col items-center min-h-96">
                                    <p className="mt-3 text-gray-500 dark:text-gray-200">This is the response from the Gemini API.</p>
                                </div>
                            }
                            />
                            

                            {/* <Card>
                                <CardContent>
                                <div className="flex flex-col items-center justify-center">
                                    <img
                                    alt="API Response"
                                    className="rounded-lg object-cover"
                                    height={300}
                                    src="/placeholder.svg"
                                    style={{
                                        aspectRatio: "400/300",
                                        objectFit: "cover",
                                    }}
                                    width={400}
                                    />
                                    <p className="mt-4 text-gray-500 dark:text-gray-400">This is the response from the Gemini API.</p>
                                </div>
                                </CardContent>
                            </Card> */}
                        </div>
                    </div>

                    {/* ------------- */}

                    {/* -------------- */}

                    <div className="flex-1 border-r border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
                        <div className="mb-6 space-y-4">
                            <h2 className="text-2xl font-bold text-center">Sustainability Predictions</h2>
                            <div className="flex items-center justify-between">
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="flex items-center gap-2" variant="outline">
                                    {/* <GlobeIcon className="h-4 w-4" /> */}
                                    <span>Select Country</span>
                                    {/* <ChevronDownIcon className="h-4 w-4" /> */}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-[200px]">
                                    <DropdownMenuLabel>Countries</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem value="us">United States</DropdownMenuItem>
                                    <DropdownMenuItem value="uk">United Kingdom</DropdownMenuItem>
                                    <DropdownMenuItem value="ca">Canada</DropdownMenuItem>
                                    <DropdownMenuItem value="au">Australia</DropdownMenuItem>
                                    <DropdownMenuItem value="de">Germany</DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <CardNew
                                    title="Emissions Prediction"
                                    content={
                                        <p className="text-gray-500 dark:text-gray-400">
                                            This is the prediction for future emissions levels based on the ML model.
                                        </p>
                                    }
                                />
                                <CardNew
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
                                />
                            </div>
                        </div>
                    </div>

                    {/* ---------------- */}
            </div>
        </div>
    );
};
  
export default Dashboard;