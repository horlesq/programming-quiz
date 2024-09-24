exports.handler = async (event, context) => {
    const data = [
        {
            question:
                "Which programming language is primarily used for web development?",
            options: ["Python", "JavaScript", "Java", "C++"],
            correctOption: 1,
            points: 10,
        },
        {
            question: "What does SQL stand for?",
            options: [
                "Simple Query Language",
                "Structured Query Language",
                "Server Query Language",
                "Script Query Language",
            ],
            correctOption: 1,
            points: 10,
        },
        {
            question: "What is the time complexity of binary search?",
            options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
            correctOption: 1,
            points: 20,
        },
        {
            question: "Which of these is not a relational database?",
            options: ["MySQL", "MongoDB", "PostgreSQL", "SQLite"],
            correctOption: 1,
            points: 10,
        },
        {
            question:
                "Which of these is used to handle asynchronous operations in JavaScript?",
            options: ["Promises", "Variables", "Loops", "Events"],
            correctOption: 0,
            points: 20,
        },
        {
            question:
                "Which Python library is commonly used for data analysis?",
            options: ["NumPy", "Pandas", "TensorFlow", "PyTorch"],
            correctOption: 1,
            points: 10,
        },
        {
            question: "What type of programming language is Python?",
            options: ["Compiled", "Interpreted", "Both", "None of the above"],
            correctOption: 1,
            points: 10,
        },
        {
            question: "Which of the following is a Python data type?",
            options: ["List", "Dictionary", "Tuple", "All of the above"],
            correctOption: 3,
            points: 10,
        },
        {
            question: "Which company developed the Go programming language?",
            options: ["Microsoft", "Apple", "Google", "Amazon"],
            correctOption: 2,
            points: 10,
        },
        {
            question:
                "Which of the following sorting algorithms has the best average time complexity?",
            options: [
                "Bubble Sort",
                "Insertion Sort",
                "Merge Sort",
                "Selection Sort",
            ],
            correctOption: 2,
            points: 20,
        },
        {
            question: "What does REST stand for in web development?",
            options: [
                "Representational State Transfer",
                "Real-Time Software Transfer",
                "Remote Server Transaction",
                "Random State Transfer",
            ],
            correctOption: 0,
            points: 10,
        },
        {
            question: "In which language is the Linux kernel written?",
            options: ["Python", "Java", "C", "Ruby"],
            correctOption: 2,
            points: 20,
        },
        {
            question:
                "Which version control system is most commonly used for open-source projects?",
            options: ["Git", "SVN", "Mercurial", "CVS"],
            correctOption: 0,
            points: 10,
        },
        {
            question: "Which of the following is not an OOP concept?",
            options: [
                "Inheritance",
                "Polymorphism",
                "Encapsulation",
                "Compilation",
            ],
            correctOption: 3,
            points: 10,
        },
        {
            question: "What does CSS stand for?",
            options: [
                "Cascading Style Sheets",
                "Computer Styling System",
                "Creative Style System",
                "Central Style Sheets",
            ],
            correctOption: 0,
            points: 10,
        },
        {
            question: "Which of the following is a valid HTTP method?",
            options: ["POST", "GET", "DELETE", "All of the above"],
            correctOption: 3,
            points: 10,
        },
        {
            question:
                "What is the main advantage of using a NoSQL database over a SQL database?",
            options: [
                "Complex querying",
                "Horizontal scaling",
                "Strict schemas",
                "In-memory operations",
            ],
            correctOption: 1,
            points: 20,
        },
        {
            question: "Which symbol is used to denote a class in Python?",
            options: ["def", "class", "function", "self"],
            correctOption: 1,
            points: 10,
        },
        {
            question: "What is the file extension for JavaScript files?",
            options: [".java", ".js", ".jsx", ".ts"],
            correctOption: 1,
            points: 10,
        },
        {
            question:
                "Which of the following data structures uses the LIFO principle?",
            options: ["Queue", "Array", "Stack", "Linked List"],
            correctOption: 2,
            points: 20,
        },
    ];

    return {
        statusCode: 200,
        body: JSON.stringify(data), // Convert data to JSON string
    };
};
