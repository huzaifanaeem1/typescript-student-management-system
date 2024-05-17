#!/usr/bin/env node

/// Typescript Project Student_Mangement_System

import chalk from "chalk"
import inquirer from "inquirer";

// Define student class
class Student {
    static counter = 1000; // Initialize the static counter
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; // Initialize empty array for courses
        this.balance = 100;
    }

    // Method to enroll a student in a courses
    enroll_course(course: string) {
        this.courses.push(course);
    }

    // Method to view a student balance
    view_balance() {
        console.log((chalk.greenBright)(`Balance for ${this.name}: $${this.balance}`));
    }

    // Method to pay student fees
    pay_fees(amount: number) {
        this.balance -= amount;
        console.log((chalk.greenBright)(`$${amount} Fees paid successfully for ${this.name}`));
    }

    // Method to display student status
    show_status() {
        console.log((chalk.greenBright)(`ID: ${this.id}`));
        console.log((chalk.greenBright)(`Name: ${this.name}`));
        console.log((chalk.greenBright)(`Courses: ${this.courses}`));
        console.log((chalk.greenBright)(`Balance: $${this.balance}`));
    }
}

// Define a student manager to manage students
class StudentManager {
    students: Student[];

    constructor() {
        this.students = [];
    }

    // Method to add a new student
    add_student(name: string) {
        let student = new Student(name);
        this.students.push(student);
        console.log((chalk.greenBright)(`Student: ${name} added successfully, Student ID:${student.id}`));
    }

    // Method to enroll a student in a course
    enroll_student(student_id: number, course: string) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log((chalk.greenBright)(`${student.name} enrolled in ${course} successfully`));
        }
    }

    // Method to view a student balance
    view_student_balance(student_id: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        } else {
            console.log((chalk.redBright)("Student not found. Please enter a correct student ID"));
        }
    }

    // Method to pay student fees
    pay_student_fees(student_id: number, amount: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        } else {
            console.log((chalk.redBright)("Student not found. Please enter a correct student ID"));
        }
    }

    // Method to display student status
    show_student_status(student_id: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }

    // Method to find a student by ID
    find_student(student_id: number) {
        return this.students.find(std => std.id === student_id);
    }
}

// Main function to run the program
async function main() {
    console.log((chalk.yellowBright)("Welcome to 'Huzaifa Naeem' - Student Management System"));
    console.log("-".repeat(55));

    let manager = new StudentManager(); // Create an instance of StudentManager

    // While loop to keep running the program
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);

        // Using switch case to handle user choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name"
                    }
                ]);
                manager.add_student(name_input.name);
                break;

            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID"
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course Name"
                    }
                ]);
                manager.enroll_student(course_input.student_id, course_input.course);
                break;

            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID"
                    }
                ]);
                manager.view_student_balance(balance_input.student_id);
                break;

            case "Pay Fees":
                let fee_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID"
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter an amount to pay"
                    }
                ]);
                manager.pay_student_fees(fee_input.student_id, fee_input.amount);
                break;

            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID"
                    }
                ]);
                manager.show_student_status(status_input.student_id);
                break;

            case "Exit":
                console.log((chalk.redBright)("Exiting"));
                process.exit();
        }
    }
}

// Calling the main function
main();
