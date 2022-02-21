# DTCD-LiveDashControlPanel

Extension plugin of [DTCD-LiveDashPanel](https://github.com/ISGNeuroTeam/LiveDashPanel) for working with state of this in [DTCD](https://github.com/ISGNeuroTeam/DTCD) application.

## Getting Started

In order to use this plugin you need to download it, build and move build-file to _plugins_ folder on DTCD server.

### Prerequisites

- [node.js](https://nodejs.org/en/) LTS version 14.x.x
- [DTCD](https://github.com/ISGNeuroTeam/DTCD) v0.4.0
- `make` utility

### Building

```
make build
```

## Running the tests

```
make test
```

## Create build package

```
make pack
```

## Clear dependencies

```
make clean
```

## Deployment

Use `make pack` to get a deployable tarball. Move it to plugins directory and unarchive it with the following commands:

```
tar -zxf DTCD-LiveDashControlPanel-*.tar.gz ./DTCD-LiveDashControlPanel
```

## Built With

- [DTCD-SDK](https://github.com/ISGNeuroTeam/DTCD-SDK)
- [Rollup.js](https://rollupjs.org/guide/en/) - JavaScript project builder

## Contributing

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ISGNeuroTeam/DTCD-WorkspacePanel/tags).

Also you can see the [CHANGELOG](CHANGELOG.md) file.

## Authors

- Roman Kuramshin (rkuramshin@isgneuro.com)
- Konstantin Rozov (konstantin@isgneuro.com)

## License

This project is licensed under the OT.PLATFORM license agreement - see the [LICENSE](LICENSE.md) file for details

## Acknowledgments
