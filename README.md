# eslint-plugin-module-structure

ESLint plugin for modular directory code factorization.

This is not completed yet. Most use cases are probably there, but weird shit like `../private/./thing/../../private/./.././.private/thing` might be incorrectly rejected. Honestly, thinking of just adding in prevention for that here as well. Rejecting it outright might be the easiest path.

## Links

### Github

https://github.com/James-Mnemosyne/eslint-plugin-module-structure/tree/master

### NPM

https://www.npmjs.com/package/eslint-plugin-module-structure

## Overview

It can be difficult to enforce interfaces in typescript without destroying your code structure. Interfaces that aren't maintained in the same file as their dependent code are effectively useless, but code sprawl reduces productivity and muddles clarity. This should help, by enforcing a module pattern that is not dependent on single file exports.

I'll type out a longer doc later, but with this plugin, you can now add a /private directory anywhere, and it will only be accessible from the immediate files above it (which can expose interfaces) or through other files in that private directory.

## Install

You can install this package as a dev dep, or you can install it globally.

### NPM

`npm i --save-dev eslint-plugin-module-structure`

### Yarn

`yarn add -D eslint-plugin-module-structure`

## Use

Update your eslint config with the following:

```
{
  ...
  "plugins": [
      ...
      "module-structure"
  ],
  "rules": {
    ...
    "module-structure/module-structure": []
  }
}

```

## Extended Use

None yet. Honestly, just working on getting out the basics. It's not perfect as is.