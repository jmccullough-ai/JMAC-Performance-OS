# JMAC Performance OS

Google Sheets UI + Apps Script runtime for dynamic athletic performance programming.

## Release
v3.0.0-alpha.1 — Core OS Foundation

## Install
1. Open your Google Sheet.
2. Go to Extensions → Apps Script.
3. Create each `.gs` file from `/apps-script` and paste the matching code.
4. Run `JMAC_install()` from `Core.gs`.
5. Reload the Google Sheet.
6. Use the JMAC OS menu → Compose Program.

## Included Modules
- Core.gs
- Config.gs
- Utilities.gs
- Logger.gs
- DatabaseSeed.gs
- SplitEngine.gs
- RuleEngine.gs
- Athena.gs
- ComposeProgram.gs
- Validation.gs
- Repair.gs
- Progression.gs
- StressEngine.gs
- PrintEngine.gs
- Dashboard.gs
- UI.gs

## Included Databases
- ExerciseDB.csv
- PerformanceSolutions.csv
- Sports.csv
- Ecosystems.csv
- TrainingMetrics.csv
- ProgramRules.csv
- Progressions.csv
- CoachDNA.csv

## Current Capability
- Creates/repairs required sheets
- Builds Home controls
- Loads starter databases into hidden sheets
- Generates dynamic 1–4 day programs
- Uses ATHENA exercise scoring
- Validates and repairs sessions
- Writes print-ready athlete cards
- Builds coach dashboard summary

