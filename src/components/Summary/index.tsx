
import React, { useContext }  from "react";
import incomeImg from "../../assets/income.svg"
import outomeImg from "../../assets/outcome.svg"
import totalImg from "../../assets/total.svg"
import {  useTransactions } from "../../hooks/useTransactions"

import { Container } from "./styles"

export function Summary(){
    const { transactions }=  useTransactions()


    const summary = transactions.reduce((acc, transaction) => {
        
        if(transaction.type === "deposit"){
            acc.deposits += transaction.amount
            acc.total += transaction.amount
        }else{
            acc.withdraw += transaction.amount
            acc.total -= transaction.amount
        }

        return acc

    }, {
        deposits: 0,
        withdraw: 0,
        total: 0
    })




    function formattedValue( value: number){
        return new Intl.NumberFormat("pt-BR", {
            style: 'currency',
            currency: 'BRL'
        }).format(value)
    }

    return(
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas"/>
                </header>
                <strong>{formattedValue(summary.deposits)}</strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outomeImg} alt="Entradas"/>
                </header>
                <strong>{`- ${formattedValue(summary.withdraw)}`}</strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Entradas"/>
                </header>
                <strong>{formattedValue(summary.total)}</strong>
            </div>
        </Container>
    )
}