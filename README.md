[![NPM version](https://badge.fury.io/js/gulp-install-tools.svg)](http://badge.fury.io/js/gulp-install-tools)
[![GitHub tag](https://img.shields.io/github/tag/thecodechef/gulp-install-tools.svg?style=flat-square)](https://github.com/thecodechef/gulp-install-tools/releases/latest)
[![GitHub tag](https://img.shields.io/github/release/thecodechef/gulp-install-tools.svg?style=flat-square)](https://github.com/thecodechef/gulp-install-tools/releases)
[![NPM](https://nodei.co/npm/gulp-install-tools.png)](https://nodei.co/npm/gulp-install-tools/)
<a href="http://www.patreon.com/TheCodeChef"><img css="display:inline-block;" src="./patreon_support_me_btn.png" title="Suppport Me On Patreon"></a>

# gulp-install-tools #

> A Simple Toolset to Help Install & Uninstall Gulp Plugins.

## Install with NPM ##

```bash
sudo npm install gulp-install-tools --save-dev
```

## Usage ##

### Before You Require gulp-install-tools: ###

```
  sudo npm install gulp-{util,data,add-src,notify,filter,git,include,template,imagemin,tag-version,bump,flatmap,if,concat,uglify,responsive,rename,replace,pug,verb}
```

### After You Require gulp-install-tools: ###

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

## Author ##

**Jeremy Bolding**

 * [github/thecodechef](https://www.github.com/thecodechef)
 * [twitter/thecodechef](https://www.twitter.com/thecodechef)

## Copyright & License ##

Copyright (c) 2016 Jeremy Bolding, All Rights Reserved.
Licensed under the __MIT__ License.

***

<a href="http://www.patreon.com/TheCodeChef"><img css="margin:10px auto; display:inline-block;" src="./patreon.png" title="Suppport Me On Patreon"></a>