import { useContext, useEffect, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import { api } from "../../services/api";
import { Container } from "./styles";

export function TransactionsTable(){

var { transactions } = useTransactions();

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Value</th>
                        <th>Category</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map(transactions => {
                        return (
                            <tr key={transactions.id}>
                                <td>{transactions.title}</td>
                                <td className={transactions.type}>
                                    {new Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL"
                                    }
                                    ).format(transactions.ammount)}
                                </td>
                                <td>{transactions.category}</td>
                                <td>{new Intl.DateTimeFormat("pt-BR").format(
                                    new Date(transactions.createdAt)
                                )}</td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>
        </Container>
    )
}