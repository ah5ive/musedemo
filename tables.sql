CREATE TABLE IF NOT EXISTS users(
	id SERIAL PRIMARY KEY,
	username TEXT,
	email TEXT,
	password TEXT
);

CREATE TABLE IF NOT EXISTS songlists(
	id SERIAL PRIMARY KEY,
	songname VARCHAR (50),
	user_id INTEGER,
	category TEXT,
	song_url TEXT,
	likecount integer,
	playcount integer
);