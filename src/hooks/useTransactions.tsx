import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { api } from "../services/api";

interface Transaction {
    id: number;
    title: string;
    ammount: number;
    category: string;
    createdAt: string;
    type: string;
}

// interface TransactionInput{
//     title: string;
//     ammount: number;
//     category: string;
//     type: string;
// }

type TransactionInput = Omit<Transaction, "id" | "createdAt">;

// type TransactionInput = Pick<Transaction, "title" | "category" | "type" | "ammount">;

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

var TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    var [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: TransactionInput){
       var response = await api.post("/transactions", {
           ...transactionInput,
           createdAt: new Date(),
       })
       var { transaction } = response.data

       setTransactions([
           ...transactions,
           transaction,
       ])
    }

    return(
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            { children }
        </TransactionsContext.Provider>
    )

}

export function useTransactions(){
    var context = useContext(TransactionsContext);

    return context;
}