import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import jwtDecode from "jwt-decode";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieGrafic = () => {
  const [amount, setAmount] = useState(100);
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [amount3, setAmount3] = useState(0);
  const [amount4, setAmount4] = useState(0);

  //donde pone amount poner meses
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const user_id = jwtDecode(token).user.id;

    axios
      .get(`http://localhost:4000/graphics/getdata/${user_id}`)

      .then((res) => {
        res.data.result.forEach((element) => {
          {
            element.month_id === 0 ||
              element.month_id === 1 ||
              (element.month_id === 2 && setAmount1(amount1 + element.amount));
            setAmount(0);
          }

          {
            element.month_id === 3 ||
              element.month_id === 4 ||
              (element.month_id === 5 && setAmount2(amount2 + element.amount));
            setAmount(0);
          }

          {
            element.month_id === 6 ||
              element.month_id === 7 ||
              (element.month_id === 8 && setAmount3(amount3 + element.amount));
            setAmount(0);
          }

          {
            element.month_id === 9 ||
              element.month_id === 10 ||
              (element.month_id === 11 && setAmount4(amount4 + element.amount));
            setAmount(0);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const data = {
    labels: ["Q1", "Q2", "Q3", "Q4", ""],
    datasets: [
      {
        label: "Asset Allocation",
        data: [amount1, amount2, amount3, amount4, amount],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0)",
        ],

        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 0)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
};
