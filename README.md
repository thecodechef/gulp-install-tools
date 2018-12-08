[![NPM version](https://img.shields.io/npm/v/gulp-install-tools.svg)](http://badge.fury.io/js/gulp-install-tools)
[![GitHub tag](https://img.shields.io/github/tag/thecodechef/gulp-install-tools.svg?style=flat-square)](https://github.com/thecodechef/gulp-install-tools/releases/latest)
[![GitHub issues](https://img.shields.io/github/issues/thecodechef/gulp-install-tools.svg?style=flat-square)](https://github.com/thecodechef/gulp-install-tools/issues?utf8=✓&q=is%3Aissue+is%3Aopen)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/thecodechef/gulp-install-tools.svg?style=flat-square)](https://github.com/thecodechef/gulp-install-tools/pulls?utf8=✓&q=is%3Apr+is%3Aopen)
[![GitHub watchers](https://img.shields.io/github/watchers/thecodechef/gulp-install-tools.svg?style=flat-square)](https://github.com/thecodechef/gulp-install-tools/watchers)
[![GitHub stars](https://img.shields.io/github/stars/thecodechef/gulp-install-tools.svg?style=flat-square)](https://github.com/thecodechef/gulp-install-tools/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/thecodechef/gulp-install-tools.svg?style=flat-square)](https://github.com/thecodechef/gulp-install-tools/network)
[![Build Status](https://travis-ci.org/thecodechef/gulp-install-tools.svg?branch=master)](https://travis-ci.org/thecodechef/gulp-install-tools)
[![NPM](https://nodei.co/npm/gulp-install-tools.png?downloads=true&stars=true)](https://nodei.co/npm/gulp-install-tools/) [![Greenkeeper badge](https://badges.greenkeeper.io/thecodechef/gulp-install-tools.svg)](https://greenkeeper.io/)
<a href="http://www.patreon.com/TheCodeChef"><img css="display:inline-block;" src="./patreon_support_me_btn.png" title="Suppport Me On Patreon"></a>

# gulp-install-tools #

> A Simple Toolset to Help Install & Uninstall Gulp Plugins.

## Install with NPM ##

```bash
sudo npm install gulp-install-tools --save-dev
```

## Usage ##

### Before: ###

```
  sudo npm install --save-dev gulp-{util,data,add-src,notify,filter,git,include,template,imagemin,tag-version,bump,flatmap,if,concat,uglify,responsive,rename,replace,pug,verb}
```

### After: ###

```js
const gulp = require('gulp'),
      $    = require('gulp-install-tools')(gulp, [ // List of Gulp Plugins you want installed
        'util',
        'data',
        'add-src',
        'notify',
        'filter',
        'git',
        'include',
        'template',
        'imagemin',
        'tag-version',
        'bump',
        'flatmap',
        'if',
        'pug',
        'concat',
        'uglify',
        'responsive',
        'rename',
        'replace',
        'verb'
      ])
```

### Then Run in the Command Line: ###

```bash
# whatever is in the list will be installed
gulp install
```

_*or*_

```bash
# whatever is not in the list will be uninstalled
gulp uninstall
```

### Now you can use in gulpfile.js ###

```js
  gulp.task('default',() => {
    return gulp.src('./templates/pages/*.pug')
      .pipe($.pug({pretty: true}))
      .pipe(gulp.dest('./dist'));
  });
```

## Generated Tasks ##

### Install Task ###

> The `install` task is to install tasks that are in your list of specified packages

#### Example: ####
```bash
gulp install
```

### Uninstall Task ###

> The `uninstall` task is to uninstall tasks that are not in your list of specified packages

#### Example: ####
```bash
gulp uninstall
```

### Bump Task ###

> The `bump` task is to bump the package.json version number by one at each float point
>  common args are ['**--patch**','**--minor**','**--major**','**--pre**']

#### Example: ####
```bash
# Bumps the version to *.*.1
gulp bump
```
#### Example: ####
```bash
# Bumps the version to *.*.1
gulp bump --patch
```
#### Example: ####
```bash
# Bumps the version to *.1.*
gulp bump --minor
```
#### Example: ####
```bash
# Bumps the version to 1.*.*
gulp bump --major
```
#### Example: ####
```bash
# Bumps the version to *.*.*-0
gulp bump --pre
```

### Init Task ###

> The `init` task is to initialize an empty repository in your directory if one already exists it does nothing
> but tell you one already exists

#### Example: ####
```bash
gulp init
```

### Tag Task ###

> The `tag` task is to create a git tag from the package.json version

#### Example: ####
```bash
gulp tag
```

### Commit Task ###

**Note:** You will have to use the `sudo` command before it

> The `commit` task is to commit changes to your repo
> common args are['**--message**']

#### Example: ####
```bash
sudo gulp commit
```

#### Example: ####
```bash
sudo gulp commit --message "Initial Commit"
```

### Publish Task ###

**Note:** You will have to use the `sudo` command before it

> The `publish` task is to publish your package to npmjs
> very helpful if your developing your own gulp plugin or a normal npm package
> it depend on the `tag` & `commit` tasks which both depend on the `init` task

#### Example: ####
```bash
sudo gulp publish
```

## Auto-Bumping & Publishing  ##

> The easiest way that i have found to do this is:

```bash
gulp bump;sudo gulp publish
```

## Author ##

**Jeremy Bolding**

 * [github/thecodechef](https://www.github.com/thecodechef)
 * [twitter/thecodechef](https://www.twitter.com/thecodechef)

## Copyright & License ##

Copyright (c) 2016 Jeremy Bolding, All Rights Reserved.
Licensed under the __MIT__ License.

***

<a href="http://www.patreon.com/TheCodeChef"><img css="margin:10px auto; display:inline-block;" src="./patreon.png" title="Suppport Me On Patreon"></a>