#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";


console.log(chalk.greenBright`\n\t\t\t********************************WELCOME TO MY BANK*************************************`)

// Bank account interface

interface BankAccount {
  accountNumber: number;
  balance: number;
  withDraw(amount: number): void;
  deposit(amount: number): void;
  checkBalance(): void;
}

// Bamk Account class

class BankAccount implements BankAccount {
  accountNumber: number;
  balance: number;

  constructor(accountNumber: number, balance: number) {
    (this.accountNumber = accountNumber), (this.balance = balance);
  }
  //   depit money
  withDraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(
       chalk.gray( `\nWithdrawal of ${amount}$ successful. Remaining balance is ${this.balance}$.\n`)
      );
    } else console.log(chalk.red("\nInsufficiant balance.\n"));
  }

  //   credit money
  deposit(amount: number): void {
    if (amount > 100) {
      amount -= 1; // 1$ fee charge if more than 100$ is deposited
    }
    this.balance += amount;
    console.log(
     chalk.blue (`\nDeposit of ${amount}$ successful. Remaining balance: ${this.balance}$.\n`)
    );
  }

  // check balance
  checkBalance(): void {
    console.log(chalk.blue(`\nCurrent balance: ${this.balance}$.`));
  }
}

//  Customer Class
class Customer {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  mobileNumber: number;
  account: BankAccount;

  constructor(
    firstName: string,
    lastName: string,
    gender: string,
    age: number,
    mobileNumber: number,
    account: BankAccount
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.mobileNumber = mobileNumber;
    this.account = account;
  }
}

// Create bank accounts:

let accounts: BankAccount[] = [
  new BankAccount(10001, 2000),
  new BankAccount(10002, 4500),
  new BankAccount(10003, 5000),
];

// create customer 

let customers: Customer[]= [
    new Customer("Ahmed","Hadi","Male",20,3022187590,accounts[0]),
    new Customer("Lubna","Nazish","Femain",27,3008938194,accounts[1]),
    new Customer("Affan","Shahmir","Male",28,3113904009,accounts[2])
];

// Function to interact with bank account

async function service(){
    do{
        let  accountNumberInput = await inquirer.prompt({
            name:"accountNumber",
            type:"number",
            message:"Enter your account number: "
        })

        let customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber );
        if(customer){console.log(chalk.yellow(`\nWelcome ${customer.firstName} ${customer.lastName}!\n`))
           
      let answer = await inquirer.prompt({
        name:"select",
        type:"list",
        message:"Please select an operation: ",
        choices:["Deposit","Withdraw","Check Balance","Exit"]
      });

      switch(answer.select){
        case "Deposit":
            let depositAmount = await inquirer.prompt({
                name:"amount",
                type:"number",
                message:"Please enter the amount to deposit: "
            }) ;

            customer.account.deposit(depositAmount.amount);
            break;

            case "Withdraw":
                let withDrawAmount = await inquirer.prompt({
                    name:"amount",
                    type:"number",
                    message:"Please enter the amount to withdraw: "
                }) ;
    
                customer.account.withDraw(withDrawAmount.amount);
                break;
               
             case "Check Balance":
                customer.account.checkBalance();
                    break;

                    case "Exit":
                        console.log(chalk.red("Exiting bank program...."));
                        console.log(chalk.yellow("\n Thank You for using our bank services. Have a great day!"));
                        return;
      }

    
    } else {
        console.log(chalk.redBright(`Invalid account number. Please try again.`))
    }

    }while(true)
};

service();