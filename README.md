# rankings-api
A simple API for retrieving The Fantasy Footballers rankings data.

# Setup
Since this API doesn't have direct access to live rankings data, it runs on a local file. To initialize that file, run the following command to pull data from the ffballers site:

```npm scrape-data```

# Running the app
To start with nodemon for development:

```npm run start:dev``` 

To start without nodemon:

```npm start```

# Routes
## GET Player rankings
```rankings/players?player=player_name```

Returns a list of players matching the player name provided for all scoring formats.

## GET Player rankings for format
```rankings/players/:scoring?player=player_name```

Returns a list of players matching the player name provided for the specified scoring format.

## GET Position rankings
```rankings/:position?[rankedBy=baller_name]```

Returns all rankings for players in the position all scoring formats. Optionally sorted by the specified baller's rankings.

## GET Position Rankings for Scoring System
```rankings/:position/:scoring?[rankedBy=baller_name]```

Returns all rankings for players in the position the specified scoring formats. Optionally sorted by the specified baller's rankings.
