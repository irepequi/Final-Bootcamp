import React from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DonutGrafic = () => {
  const [amount, setAmount] = useState(100);
  const [amount2, setAmount2] = useState(0);
  const [amount3, setAmount3] = useState(0);

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
              element.month_id === 2 ||
              element.month_id === 3 ||
              element.month_id === 4 ||
              (element.month_id === 5 && setAmount2(amount2 + element.amount));
            setAmount(0);
          }

          {
            element.month_id === 6 ||
              element.month_id === 7 ||
              element.month_id === 8 ||
              element.month_id === 9 ||
              element.month_id === 10 ||
              (element.month_id === 11 && setAmount3(amount3 + element.amount));
            setAmount(0);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const data = {
    labels: ["Semester 1", "Semester 2", ""],

    datasets: [
      {
        label: "Commitment by Year",
        data: [amount2, amount3, amount],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(54, 162, 235, 0)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
};
