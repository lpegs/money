import Modal from "react-modal";
import incomeImg from "../../assets/in.svg"
import outcomeImg from "../../assets/out.svg"
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import closeImg from "../../assets/close.svg"
import { FormEvent, useState, useContext } from "react";
import { api } from "../../services/api";
import { useTransactions } from "../../hooks/useTransactions";


interface NewTransactionModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps){

    var { createTransaction } = useTransactions();

    var [title, setTitle] = useState("");
    var [ammount, setAmmount] = useState(0);
    var [category, setCategory] = useState("");
    var [type, setType] = useState("deposit");

    async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault()

        await createTransaction({
            title,
            ammount,
            type,
            category,
        });
        
        setTitle("");
        setAmmount(0);
        setCategory("");
        setType("deposit");
        onRequestClose();

    }

    return (
        <Modal 
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Close modal" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>

                <h2>New transaction</h2>

                <input 
                    placeholder="Title"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />

                <input 
                    type="number" 
                    placeholder="Ammount"
                    value={ammount}
                    onChange={event => setAmmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => { setType("deposit") }}
                        isActive={type === "deposit"}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Income" />
                        <span>Income</span>
                    </RadioBox>

                    <RadioBox
                        type="button"
                        onClick={() => { setType("withdraw") }}
                        isActive={type === "withdraw"}
                        activeColor="red"

                    >
                        <img src={outcomeImg} alt="Outcome" />
                        <span>Outcome</span>
                    </RadioBox>

                </TransactionTypeContainer>

                <input 
                    placeholder="Category"
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />

                <button type="submit">Submit</button>

            </Container>

        </Modal>
    );
}