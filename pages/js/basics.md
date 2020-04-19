# JavaScript Basics

## Programs and Statements

A _computer program_ is a list of _statements_ for a computer to execute. When you write a program, you are essentially writing a list of things you want the computer to do. We refer to each instruction as a _statement_, and therefore coding (or programming) can be thought of as writing a series of statements. The editor below shows a short program with three statements.

```js
print("Hello world!"); // Statement 1
const x = 5; // Statement 2
print(x + 2); // Statement 3
```

Once you understand a programming "language", you can think of programming as telling a computer what to do! Throughout this site, we will be using a programming "language" named _JavaScript_.

## What is JavaScript?

JavaScript is the programming "language" that web browsers understand, and therefore it can be thought of as "the language of the web". Chances are, every website that you visit on a regular base is using JavaScript behind the scenes. This site is powered almost entirely by JavaScript! It is a very powerful language, and is relatively easy to learn.

Although JavaScript was originally developed for use in web browsers, it's use has been since expanded. For example, Walmart recently started using JavaScript (Node.js) to run the purchasing portion of their website, and it saved them a ton of money!

## JavaScript Syntax

In programming, the _syntax_ of a language is the set of rules that you must follow for the computer to understand your code. Consider the editor below: the first line uses correct syntax, whereas the second line does not use correct syntax. In the output, there is an error because we did not use proper syntax.

```js
print("Hello world!"); // Correct syntax
print "Hello world!"; // Incorrect syntax
```

In the editor above, change the second line to look like the first line, and things will work! Throughout this tutorial, you will be slowly introduced to the syntax of JavaScript. It will be discussed in further detail on this page.

## Variables

In programming, variables are like "named containers" for storing data. This allows you to name a piece of data, and
 refer to it by that name later on. In JavaScript, we define variables by writing statements of the form `const [name] = [value]`. For example, `const x = 5`; will store the value "5" in a variable named `x`, and any time you reference the
  variable `x` the code will read it as "5". In JavaScript we can name our variables using letters, numbers, and some characters such as underscores (just make sure your variable name starts with a letter). The editor below shows some code where variables are defined and used.

```js
const x = 5;
print(2 * x);
const yourName = "John Doe";
print(yourName);
const a = 3;
print(a * x);
```
