import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express, { json } from "express";
import { convertHoursStringToMinutes, convertMinutesToHoursString } from "./utils/convertHoursString.js";

const app = express();
const prisma = new PrismaClient();

await prisma.$connect();

app.use(json());
app.use(cors());

app.get("/games", async (_req, res) => {
	const games = await prisma.game.findMany({
		include: {
			_count: {
				select: {
					ads: true,
				},
			},
		},
	});

	res.json(games);
});

app.post("/games/:id/ads", async (req, res) => {
	const gameId = req.params.id;
	const body = req.body;

	// TODO: Validate body

	const ad = await prisma.ad.create({
		data: {
			gameId,
			name: body.name,
			weekDays: body.weekDays.join(","),
			useVoiceChannel: body.useVoiceChannel,
			yearsPlaying: body.yearsPlaying,
			hoursStart: convertHoursStringToMinutes(body.hoursStart),
			hoursEnd: convertHoursStringToMinutes(body.hoursEnd),
			discord: body.discord,
		},
	});

	res.status(201).json(ad);
});

app.get("/games/:id/ads", async (req, res) => {
	const gameId = req.params.id;

	const ads = await prisma.ad.findMany({
		select: {
			id: true,
			name: true,
			weekDays: true,
			useVoiceChannel: true,
			yearsPlaying: true,
			hoursStart: true,
			hoursEnd: true,
		},
		where: {
			gameId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	res.json(
		ads.map((ad) => ({
			...ad,
			weekDays: ad.weekDays.split(","),
			hoursStart: convertMinutesToHoursString(ad.hoursStart),
			hoursEnd: convertMinutesToHoursString(ad.hoursEnd),
		})),
	);
});

app.get("/ads/:id/discord", async (req, res) => {
	const adId = req.params.id;

	const ad = await prisma.ad.findUniqueOrThrow({
		where: {
			id: adId,
		},
		select: {
			discord: true,
		},
	});

	res.json(ad);
});

app.listen(3_333);
