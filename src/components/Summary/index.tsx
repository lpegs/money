import React, { useContext } from 'react';
import incomeImg from "../../assets/in.svg"
import outcomeImg from "../../assets/out.svg"
import totalImg from "../../assets/total.svg"
import { useTransactions } from '../../hooks/useTransactions';
import { Container } from "./styles";

export function Summary(){

    var { transactions } = useTransactions();
    
    // var totalDeposits = transactions.reduce((acc, transaction) => {
    //     if (transaction.type == "deposit") {
    //         return acc + transaction.ammount;
    //     }
    //     return acc;
    // }, 0)

    var summary = transactions.reduce((acc, transaction) => {
        if (transaction.type == "deposit") {
            acc.deposits += transaction.ammount;
            acc.total += transaction.ammount;
        } else {
            acc.withdraws += transaction.ammount;
            acc.total -= transaction.ammount;
        }

        return acc;
    }, { 
        deposits: 0,
        withdraws: 0,
        total: 0,
    })

    return (
        <Container>
            <div>
                <header>
                    <p>Incomes</p>
                    <img src={incomeImg} alt="Incomes" />
                </header>
                <strong>{new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        }
                    ).format(summary.deposits)}</strong>
            </div>

            <div>
                <header>
                    <p>Outcomes</p>
                    <img src={outcomeImg} alt="Outcomes" />
                </header>
                <strong>-
                    {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        }
                    ).format(summary.withdraws)}</strong>
            </div>

            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>{new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        }
                    ).format(summary.total)}</strong>
            </div>

        </Container>
    )
}

function TransactionContext(TransactionContext: any) {
    throw new Error('Function not implemented.');
}
