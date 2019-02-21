#!/usr/bin/env node
const { exec } = require("child_process");
var program = require("commander");
var mirrors = require("./mirrors.json");
var PKG = require("./package.json");

program.version(PKG.version);

program
  .command("ls")
  .description("list all mirrors")
  .action(onList);

program
  .command("use <mirror>")
  .description("switch to <mirror>")
  .action(onUse);

program
  .command("help", { isDefault: true })
  .description("Print this help")
  .action(function() {
    program.outputHelp();
  });

program.parse(process.argv);

if (process.argv.length === 2) {
  program.outputHelp();
}

function onList() {
  getCurrentMirror(function(cur) {
    var info = [""];
    var allMirrors = mirrors;

    Object.keys(allMirrors).forEach(function(key) {
      var item = allMirrors[key];
      var prefix = item.brew === cur ? "* " : "  ";
      info.push(prefix + item.name + line(key, 8) + item.brew);
    });

    info.push("");
    printMsg(info);
  });
}

function onUse(name) {
  var allMirrors = mirrors;
  if (allMirrors.hasOwnProperty(name)) {
    var mirror = allMirrors[name];
    runCommand(
      `cd "$(brew --repo)" && git remote set-url origin ${mirror.brew}`
    );
    runCommand(
      `cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core" && git remote set-url origin ${
        mirror.core
      }`,
      () => {
        printMsg(["", "   Homebrew origin has been set to: " + name, ""]);
      }
    );
  } else {
    printMsg(["", name + " not found!", "Check the spell and try again."]);
  }
}

function getCurrentMirror(cb) {
  const command = 'cd "$(brew --repo)" && git config --get remote.origin.url';
  runCommand(command, cb);
}

function runCommand(command, cb) {
  exec(command, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
    cb && cb(stdout.trim());
  });
}

function printMsg(infos) {
  infos.forEach(function(info) {
    console.log(info);
  });
}

function line(str, len) {
  var line = new Array(Math.max(1, len - str.length)).join("-");
  return " " + line + " ";
}
