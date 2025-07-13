import { createClient, type RedisClientType } from "redis";

let client: RedisClientType | null = null;

export const initRedisClient = async () => {
	if (!client) {
		client = createClient({ url: "redis://redis:6379" }); // add url for docker
		// client = createClient();

		client.on("error", (err) => {
			console.error(err);
		});

		client.on("connect", () => {
			console.log("Redis connected!");
		});

		await client.connect();
	}

	return client;
};
