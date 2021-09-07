# oriole

Make time fly. 🐦

A CLI app that automatically creates a [Harvest](https://www.getharvest.com/) time entry out of your git commits.
Made using [ink](https://github.com/vadimdemedes/ink) and [pastel](https://github.com/vadimdemedes/ink).

## Install

```bash
$ npm install oriole
```
or
```bash
$ yarn add oriole
```


## Commands

### `oriole setup`
Set up your Harvest account info on your local machine so that the other `oriole`
commands can function properly.

This will ask you for your Harvest Personal Access Token and account ID (which you can find or create [here](https://id.getharvest.com/developers)), and save it to an encrypted JSON file using [conf](https://github.com/sindresorhus/conf).
Please refer to `conf`'s README to find the default location of this file (it depends on your OS). If you're using macOS, it should be:
```bash
~/Library/Preferences/oriole-nodejs/orioleStore.json
```

### `oriole init`
Initialize the current repo with a Harvest project ID and task ID. These IDs
will then be used when running `oriole push` to create a Harvest timesheet
entry.

If your current working directory is a valid git repository, this command will make a GET request to your Harvest account (using the token and account ID you provided in `oriole setup`) and show you a list of your available Harvest projects and their corresponding tasks.

Once you've selected a project and task, it will save those IDs to your encrypted `conf` store, and will be used when running `oriole push`. **Essentially, this command links your current local git repo with a Harvest project/task**.

### `oriole push`

Additional arguments:
```
--hours, -h  Set the hours spent on this Harvest entry.    [number] [required]
--date, -d   Get the commits made on the specified date.              [string]
```
This is the main command for `oriole`. Using `oriole push`, you can create a timesheet entry out of the most recent git commit messages in your current repo
(made either on the current day or on the specified date using `--date`). After confirmation, oriole will create a Harvest time entry using the previously-specified Harvest project/task, and POST it to your account.

In the event that the same project/task entry is already in your Harvest account on the day you specified (if, for example, you added it manually), `oriole` will ask whether you would like to replace that existing entry or create a new one. If there are multiple entries, choosing to replace will only replace the most recent entry.

### `oriole pto`
Additional arguments:
```
--year, -y  The year for which you'd like to see the total number of PTO hours spent.	[number]
```

Run this command to have `oriole` calculate the total number of PTO hours spent in the current calendar year. It will only calculate the PTO hours spent for the Tivix internal Harvest project and task.

Optionally pass in a different year to get the total PTO hours for that year instead.

### `oriole --help`
Shows the help text and the available commands.


## Development
There are 2 available commands:

- `npm run dev` - Start development mode and recompile on change
- `npm run build` - Build a final distributable for npm
