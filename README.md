# Homebrew Mirror Manager

manage and switch homebrew mirrors.

_inspired by [nrm](https://github.com/Pana/nrm), witch switch npm registries._

### Installing

```sh
$ yarn global add hbmm
# or
$ npm install -g hbmm
```

### Usage

#### List all mirrors

```sh
$ hbmm ls
```

#### Switch to a mirror

```sh
$ hbmm use <mirror_name>
```

#### Add a mirror

```sh
$ hbmm add <mirror_name> <brew> <core> [description]
```

- `mirror_name` is the unique key to identify the mirror
- `brew` is the homebrew git url
- `core` is the homebrew-core git url
- `description` is optional to describle the mirror

#### Remove to a mirror

```sh
$ hbmm use <mirror_name>
```

### Predefined Mirrors

Following mirrors are included :

- default
  - brew: `https://github.com/Homebrew/brew.git`
  - core: `https://github.com/Homebrew/homebrew-core.git`
- tsinghua
  - brew: `https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git`
  - core: `https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git`

### License

[![FOSSA Status](https://app.fossa.io/api/projects/custom%2B7035%2Fgithub.com%2Fwayou%2Fhbmm.svg?type=large)](https://app.fossa.io/projects/custom%2B7035%2Fgithub.com%2Fwayou%2Fhbmm?ref=badge_large)
