#!/usr/bin/env node
const { exec } = require("child_process");
var program = require("commander");
var mirrors = require("./mirrors.json");
var PKG = require("./package.json");
const fs = require("fs");

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
  .command("add <key> <description> <brew> <core>")
  .description("add a mirror")
  .action(onAdd);

program
  .command("remove <key>")
  .description("removef a mirror")
  .action(onRemove);

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
      const description = item.description || "";
      info.push(prefix + key + ":");
      info.push(`    description: ${description}`);
      info.push(`    brew: ${item.brew}`);
      info.push(`    core: ${item.core}`);
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

function onAdd(key, brew, core, desription) {
  if (!key) {
    console.log(`missing key`);
    return;
  }
  if (!brew) {
    console.log(`missing brew address`);
    return;
  }
  if (!core) {
    console.log(`missing core address`);
    return;
  }

  const mirror = {
    desription: desription || "",
    brew,
    core
  };
  mirrors[key] = mirror;
  fs.writeFile("mirrors.json", JSON.stringify(mirrors), err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`${key} added`);
  });
}

function onRemove(key) {
  if (mirrors[key]) {
    delete mirrors[key];
    fs.writeFile("mirrors.json", JSON.stringify(mirrors), err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`${key} removed`);
    });
  } else {
    console.log(`${key} not found!`);
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
