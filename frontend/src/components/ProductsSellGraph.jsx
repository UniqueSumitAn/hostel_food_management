import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductsSellGraph = () => {
  const [chartUrl, setChartUrl] = useState("");

  // Dummy product sales data
  const products = [
    { name: "Chips", sales: 150 },
    { name: "Cold Drink", sales: 110 },
    { name: "Noodles", sales: 75 },
  ];

  useEffect(() => {
    const generateGraph = async () => {
      try {
        const chartConfig = {
          type: "bar",
          data: {
            labels: products.map((p) => p.name),
            datasets: [
              {
                label: "Top Selling Products",
                data: products.map((p) => p.sales),
                backgroundColor: ["#3182CE", "#38A169", "#E53E3E"], // blue, green, red
              },
            ],
          },
          options: {
            plugins: {
              legend: { display: true },
            },
          },
        };

        const response = await axios.post(
          "https://quickchart.io/chart/create",
          { chart: chartConfig }
        );

        setChartUrl(response.data.url);
      } catch (err) {
        console.error("Chart Error:", err);
      }
    };

    generateGraph();
  }, []);

  return (
    <div className="w-full">
      <h2 className="font-bold text-xl mb-2">Top Selling Products</h2>

      {chartUrl ? (
        <img
          src={chartUrl}
          alt="Top Selling Products Chart"
          className="w-full max-w-lg rounded-xl shadow"
        />
      ) : (
        <p>Loading graph...</p>
      )}
    </div>
  );
};

export default ProductsSellGraph;
