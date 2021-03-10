# Bosch Inter IIT

## Contributing Guidelines

1. This repository consists of 2 services namely `web` and `server`.
2. So, commit code to the corresponding services.

### Setting up the repository locally

1. Fork the repo to your account.

2. Clone your forked repo to your local machine:

```
git clone https://github.com/NBNARADHYA/bosch-inter-iit.git (https)
```

or

```
git clone git@github.com:NBNARADHYA/bosch-inter-iit.git (ssh)
```

This will make a copy of the code to your local machine.

3. Change directory to `bosch-inter-iit`.

```
cd bosch-inter-iit
```

4. Check remote version of your local repo by:

```
git remote -v
```

It should output the following:

```
origin	https://github.com/<username>/bosch-inter-iit.git (fetch)
origin	https://github.com/<username>/bosch-inter-iit.git (push)
```

or

```
origin	git@github.com:<username>/bosch-inter-iit.git (fetch)
origin	git@github.com:<username>/bosch-inter-iit.git (push)
```

Add upstream to remote:

```
git remote add upstream https://github.com/NBNARADHYA/bosch-inter-iit.git (https)
```

or

```
git remote add upstream git@github.com:NBNARADHYA/bosch-inter-iit.git (ssh)
```

Running `git remote -v` should then print the following:

```
origin	https://github.com/<username>/bosch-inter-iit.git (fetch)
origin	https://github.com/<username>/bosch-inter-iit.git (push)
upstream	https://github.com/NBNARADHYA/bosch-inter-iit.git (fetch)
upstream	https://github.com/NBNARADHYA/bosch-inter-iit.git (push)
```

or

```
origin	git@github.com:<username>/bosch-inter-iit.git (fetch)
origin	git@github.com:<username>/bosch-inter-iit.git (push)
upstream	git@github.com:NBNARADHYA/bosch-inter-iit.git (fetch)
upstream	git@github.com:NBNARADHYA/bosch-inter-iit.git (push)
```

## Dev Setup

### Pre-requisites

1. Install `Docker` by looking up the [docs](https://docs.docker.com/get-docker/)
2. Install `Docker Compose` by looking up the [docs](https://docs.docker.com/compose/install/)

### Steps

1. Make sure you are in the root of the project (i.e., `./bosch-inter-iit/` folder).
2. Setup environement variables in `.env` files of all `services` and `root` according to `example.env` files.
3. Run `docker-compose up` to spin up the containers.
4. The website would then be available locally at `http://localhost:3000/`.
5. The above command could be run in detached mode with `-d` flag as `docker-compose up -d`.
6. For help, run the command `docker-compose -h`.
