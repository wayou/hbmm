# Project Title

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

### Predefined Mirrors

Following mirrors are included :

- default
    - brew: https://github.com/Homebrew/brew.git
    - core: https://github.com/Homebrew/homebrew-core.git
- tsinghua
    - brew: https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git
    - core: https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git



