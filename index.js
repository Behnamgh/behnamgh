#!/usr/bin/env node

"use strict";

import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";
import clear from "clear";
import open from "open";
import ora from "ora";
import request from "request";
import cliSpinners from "cli-spinners";
import fs from "fs";
import path from "path";

clear();

const prompt = inquirer.createPromptModule();

// Questions after the card
const questions = [
  {
    type: "list",
    name: "action",
    message: "What you want to do?",
    choices: [
      {
        name: `Send me an ${chalk.green.bold("email")}?`,
        value: () => {
          open("mailto:behnam.ghafary@gmail.com");
          console.log("\nDone, see you soon.\n");
        },
      },
      {
        name: `Send your website ${chalk.blueBright.bold(
          "behnamghafary.com"
        )}?`,
        value: () => {
          open("https://behnamghafary.com");
          console.log("\nDone, Enjoy.\n");
        },
      },
      {
        name: `Download my ${chalk.magentaBright.bold("Resume")}?`,
        value: () => {
          // cliSpinners.dots;
          const loader = ora({
            text: " Downloading Resume",
            spinner: cliSpinners.material,
          }).start();
          let pipe = request("https://bit.ly/43kaeQW").pipe(
            fs.createWriteStream("./Behnam Ghafary-CV.pdf")
          );
          pipe.on("finish", function () {
            let downloadPath = path.join(
              process.cwd(),
              "Behnam Ghafary-CV.pdf"
            );
            console.log(`\nResume Downloaded at ${downloadPath} \n`);
            open(downloadPath);
            loader.stop();
          });
        },
      },
      {
        name: "Just quit.",
        value: () => {
          console.log("Good Bye!\n");
        },
      },
    ],
  },
];

// Data for the card
const data = {
  name: chalk.bold.green("        Behnam Ghafary"),

  webiste: chalk.blueBright("        https://behnamghafary.com/"),
  twitter: chalk.gray("https://twitter.com/") + chalk.cyan("behnam_ghafary"),
  github: chalk.gray("https://github.com/") + chalk.green("behnamgh"),
  linkedin:
    chalk.gray("https://linkedin.com/in/") + chalk.blue("behnamghafary"),
  email: chalk.cyan("behnam.ghafary") + chalk.gray("@gmail.com"),
  npx: chalk.red("npx") + " " + chalk.white("behnamghafary"),

  labelTwitter: chalk.white.bold("    Twitter:"),
  labelGitHub: chalk.white.bold("     GitHub:"),
  labelLinkedIn: chalk.white.bold("   LinkedIn:"),
  labelEmail: chalk.white.bold("    Email:"),
  labelCard: chalk.white.bold("       Card:"),
};

// Build the card
const me = boxen(
  [
    `${data.name}`,
    `${data.webiste}`,
    ``,
    `${data.labelTwitter}  ${data.twitter}`,
    `${data.labelGitHub}  ${data.github}`,
    `${data.labelLinkedIn}  ${data.linkedin}`,
    ``,
    `${data.labelEmail}  ${data.email}`,
    ``,
    `${data.labelCard}  ${data.npx}`,
    ``,
    `${chalk.italic(
      "I'm curious, enthusiastic and student most of the time."
    )}`,
    `${chalk.italic("The rest of the time I experiment with my code,")}`,
    `${chalk.italic("to bring my ideas to life.")}`,
  ].join("\n"),
  {
    margin: 1,
    float: "center",
    padding: 1,
    borderStyle: "single",
    borderColor: "green",
  }
);

// Print the card
console.log(me);

// Optional tip to help users use the links
const tip = [
  `Tip: Try ${chalk.cyanBright.bold("cmd/ctrl + click")} on the links above`,
  "",
].join("\n");

// Show the tip
console.log(tip);

// Ask the Inquirer questions.
prompt(questions).then((answer) => answer.action());
