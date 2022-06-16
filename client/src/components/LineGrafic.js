import axios from "axios";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import jwtDecode from "jwt-decode";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineGrafic() {
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [amount3, setAmount3] = useState(0);
  const [amount4, setAmount4] = useState(0);
  const [amount5, setAmount5] = useState(0);
  const [amount6, setAmount6] = useState(0);
  const [amount7, setAmount7] = useState(0);
  const [amount8, setAmount8] = useState(0);
  const [amount9, setAmount9] = useState(0);
  const [amount10, setAmount10] = useState(0);
  const [amount11, setAmount11] = useState(0);
  const [amount12, setAmount12] = useState(0);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const user_id = jwtDecode(token).user.id;

    axios
      .get(`http://localhost:4000/graphics/getdata/${user_id}`)

      .then((res) => {
        res.data.result.forEach((element) => {
          {
            element.month_id === 0 && setAmount1(amount1 + element.amount);
          }

          {
            element.month_id === 1 && setAmount2(amount2 + element.amount);
          }

          {
            element.month_id === 2 && setAmount3(amount3 + element.amount);
          }

          {
            element.month_id === 3 && setAmount4(amount4 + element.amount);
          }

          {
            element.month_id === 4 && setAmount5(amount5 + element.amount);
          }

          {
            element.month_id === 5 && setAmount6(amount6 + element.amount);
          }

          {
            element.month_id === 6 && setAmount7(amount7 + element.amount);
          }

          {
            element.month_id === 7 && setAmount8(amount8 + element.amount);
          }

          {
            element.month_id === 8 && setAmount9(amount9 + element.amount);
          }

          {
            element.month_id === 9 && setAmount10(amount10 + element.amount);
          }

          {
            element.month_id === 10 && setAmount11(amount11 + element.amount);
          }

          {
            element.month_id === 11 && setAmount12(amount12 + element.amount);
          }
        });
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  const data = {
    labels: [
      "Jan ",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun ",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Growth since inception",
        data: [
          amount1,
          amount2,
          amount3,
          amount4,
          amount5,
          amount6,
          amount7,
          amount8,
          amount9,
          amount10,
          amount11,
          amount12,
        ],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.8)",
      },
    ],
  };

  return (
    <>
      <Line data={data} />
    </>
  );
}
