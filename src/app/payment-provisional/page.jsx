"use client";
import style from "./payment.module.css";
import { useState, useEffect } from "react";

export default function Page() {
  const [payments, setPayments] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchPayments() {
      const res = await fetch("/api/admin/payment");
      const data = await res.json();
      setPayments(data);
    }

    async function fetchOrders() {
      const res = await fetch("/api/admin/order");
      const data = await res.json();
      setOrders(data);
    }

    fetchPayments();
    fetchOrders();
  }, []);

  return (
    <div className={style.paymentContainer}>
      <div className={style.paymentCard}>
        {payments.map((payment) => (
          <div className={style.payment} key={payment.id}>
            <h2>Pago</h2>
            <p>
              Total: {payment.amount} {payment.currency}
            </p>
          </div>
        ))}

        {orders.map((order) => (
          <div className={style.order} key={order.id}>
            <p>
              <span className={style.orderInfo}>Orden Nro:</span>
              <br />
              {order.id}
            </p>
            <p>
              <span className={style.status}>Status:</span>
              <br />
              {order.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// [
//     {
//       id: "32271184-96e8-4aa2-92e1-c202936ae477",
//       status: "pending",
//       createdAt: "2023-05-11T22:51:36.251Z",
//       updatedAt: "2023-05-11T22:51:36.251Z",
//       userId: "932a3adf-9203-4b25-89ca-777b00411730",
//       postId: "0e87b496-c9b4-450b-b3fa-7a54d2169366",
//       paymentId: "fc6d8d87-1068-4514-854d-c5347b8e3180",
//       payment: {
//         id: "fc6d8d87-1068-4514-854d-c5347b8e3180",
//         amount: 29.99,
//         currency: "USD",
//         createdAt: "2023-05-11T22:51:10.962Z",
//         updatedAt: "2023-05-11T22:51:10.962Z",
//         userId: "932a3adf-9203-4b25-89ca-777b00411730",
//       },
//       user: {
//         id: "932a3adf-9203-4b25-89ca-777b00411730",
//         firstname: "Axel",
//         lastname: "Pérez",
//         email: "axel3456@example.com",
//         password:
//           "$2a$10$q80vNygkbjJ29JXfgNE1yO3R494IPMM8jJXpM7hGh4fbr/O.10JsG",
//         admin: false,
//         logged: false,
//         hidden: false,
//         phoneNumber: null,
//         zipCode: null,
//         reports: [],
//       },
//     },
//   ];

//   [
//     {
//       id: "fc6d8d87-1068-4514-854d-c5347b8e3180",
//       amount: 29.99,
//       currency: "USD",
//       createdAt: "2023-05-11T22:51:10.962Z",
//       updatedAt: "2023-05-11T22:51:10.962Z",
//       userId: "932a3adf-9203-4b25-89ca-777b00411730",
//       user: {
//         id: "932a3adf-9203-4b25-89ca-777b00411730",
//         firstname: "Axel",
//         lastname: "Pérez",
//         email: "axel3456@example.com",
//         password:
//           "$2a$10$q80vNygkbjJ29JXfgNE1yO3R494IPMM8jJXpM7hGh4fbr/O.10JsG",
//         admin: false,
//         logged: false,
//         hidden: false,
//         phoneNumber: null,
//         zipCode: null,
//         reports: [],
//       },
//       order: {
//         id: "32271184-96e8-4aa2-92e1-c202936ae477",
//         status: "pending",
//         createdAt: "2023-05-11T22:51:36.251Z",
//         updatedAt: "2023-05-11T22:51:36.251Z",
//         userId: "932a3adf-9203-4b25-89ca-777b00411730",
//         postId: "0e87b496-c9b4-450b-b3fa-7a54d2169366",
//         paymentId: "fc6d8d87-1068-4514-854d-c5347b8e3180",
//       },
//     },
//   ];
