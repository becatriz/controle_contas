import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from "miragejs"
import { App } from './App';


createServer({

  models:{
    transaction: Model
  },

  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Web Site",
          type: "deposit",
          category: "Dev",
          amount: 14000,
          createdAt: new Date("2021-02-21 09:00:05")
        },
        {
          id: 2,
          title: "Compras Mercado",
          type: "withdraw",
          category: "Compras",
          amount: 2500,
          createdAt: new Date("2021-02-25 19:15:08")
        }
      ]
    })
  },

  routes(){
    this.namespace = "api"

    this.get("/transactions", () => {
      return this.schema.all('transaction')
    })

    this.post("/transactions", (schema, request) => {
       const data = JSON.parse(request.requestBody)

       return schema.create('transaction', data)
    })
  }
})


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

